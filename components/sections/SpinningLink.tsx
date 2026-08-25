import Link from 'next/link'

const RADIUS = 34
const SIZE = 96
const CENTER = SIZE / 2

interface SpinningLinkProps {
  href: string
  text: string
  external?: boolean
}

export function SpinningLink({ href, text, external = false }: SpinningLinkProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={text}
      className="group relative block shrink-0 cursor-pointer transition-transform duration-200 ease-out active:scale-95"
      style={{ width: SIZE, height: SIZE }}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite] group-hover:[animation-play-state:paused]"
        aria-hidden="true">
        <defs>
          <path
            id="spinning-link-path"
            d={`M ${CENTER - RADIUS},${CENTER} a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <text className="fill-current" fontSize="6.5" letterSpacing="1.5">
          <textPath href="#spinning-link-path">{text}</textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-9 items-center justify-center rounded-full border border-current transition-transform duration-300 ease-out group-hover:scale-110">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default SpinningLink
