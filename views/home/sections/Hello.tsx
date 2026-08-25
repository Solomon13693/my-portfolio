export function Hello() {
  return (
    <div className="border-b border-line">
      <div className="border-b border-line">
        <div className="container py-3">
          <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">About</h2>
        </div>
      </div>

      <div className="container space-y-6 py-8 sm:py-12">
        <p className="max-w-2xl text-3xl leading-tight font-medium text-balance sm:text-4xl">
          I&apos;m Solomon. I build software that works — and keeps working after launch.
        </p>

        <p className="max-w-2xl text-muted-foreground">
          A Software Developer working where React, Next.js, and Laravel meet. I take a
          feature from a product requirement to a shipped release, and I stick around after it
          ships.
        </p>

        <p className="max-w-2xl text-muted-foreground">
          That&apos;s how I approach every feature: understand what it actually needs to do, work
          within what the stack can support, and ship something that holds up — not just a demo,
          but production code that delivers real value and that someone else can build on.
        </p>
      </div>
    </div>
  )
}

export default Hello
