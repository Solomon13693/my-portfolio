#!/usr/bin/env node

import { readdir, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { extname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC_DIR = join(fileURLToPath(new URL('..', import.meta.url)), 'public')

const INPUT_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const KEEP_FORMAT = new Set(['solomon.jpeg'])

const WEBP_QUALITY = 80
const JPEG_QUALITY = 82
const CONCURRENCY = 4
const SKIP_UNDER_BYTES = 450_000

const args = new Set(process.argv.slice(2))
const FORCE = args.has('--force')
const DRY_RUN = args.has('--dry-run')

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(path)))
      continue
    }
    if (entry.name.startsWith('.')) continue
    if (INPUT_EXTENSIONS.has(extname(entry.name).toLowerCase())) files.push(path)
  }

  return files
}

async function pool(items, limit, worker) {
  const pending = new Set()
  const results = []

  for (const item of items) {
    const run = Promise.resolve().then(() => worker(item))
    results.push(run)
    pending.add(run)
    run.finally(() => pending.delete(run))
    if (pending.size >= limit) await Promise.race(pending)
  }

  return Promise.all(results)
}

function shouldKeepFormat(file) {
  return KEEP_FORMAT.has(file.split(/[/\\]/).pop() ?? '')
}

async function optimizeFile(file) {
  const ext = extname(file).toLowerCase()
  const keepFormat = shouldKeepFormat(file)
  const before = (await stat(file)).size

  const alreadyCompressed =
    !FORCE && before <= SKIP_UNDER_BYTES && (ext === '.webp' || keepFormat)

  if (alreadyCompressed) {
    return { file, status: 'skip', before, after: before }
  }

  const pipeline = sharp(file, { failOn: 'none' }).rotate()
  const useWebp = !keepFormat
  const outputPath = useWebp ? `${parse(file).dir}/${parse(file).name}.webp` : file

  const buffer = useWebp
    ? await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer()
    : ext === '.png'
      ? await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()

  if (buffer.byteLength >= before) {
    return { file, status: 'skip', before, after: before }
  }

  if (DRY_RUN) {
    return { file: outputPath, status: 'dry', before, after: buffer.byteLength }
  }

  const tempPath = `${outputPath}.tmp`
  await writeFile(tempPath, buffer)
  await rename(tempPath, outputPath)

  if (outputPath !== file) await unlink(file)

  return { file: outputPath, status: 'write', before, after: buffer.byteLength }
}

const files = await walk(PUBLIC_DIR)

if (files.length === 0) {
  console.log('No images found in public/.')
  process.exit(0)
}

console.log(
  `Optimizing ${files.length} image${files.length === 1 ? '' : 's'} in public/${DRY_RUN ? ' (dry run)' : ''}…`,
)

const results = await pool(files, CONCURRENCY, async (file) => {
  try {
    return await optimizeFile(file)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { file, status: 'error', before: 0, after: 0, error: message }
  }
})

let saved = 0
let written = 0
let skipped = 0

for (const result of results) {
  if (result.status === 'error') {
    console.error(`  error  ${result.file.replace(PUBLIC_DIR + '/', '')} — ${result.error}`)
    continue
  }

  const rel = result.file.replace(PUBLIC_DIR + '/', '')
  const delta = result.before - result.after

  if (result.status === 'skip') {
    skipped += 1
    continue
  }

  written += 1
  saved += Math.max(0, delta)
  const tag = result.status === 'dry' ? 'would' : 'wrote'
  console.log(
    `  ${tag}  ${rel}  ${formatBytes(result.before)} → ${formatBytes(result.after)}  (−${formatBytes(Math.max(0, delta))})`,
  )
}

console.log(
  `\n${written} updated, ${skipped} already optimized. Saved ${formatBytes(saved)}.`,
)

if (results.some((result) => result.status === 'error')) process.exit(1)
