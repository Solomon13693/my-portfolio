/**
 * Original abstract isometric-block illustration — decorative only, never
 * carries content. Not a reproduction of any reference site's artwork.
 */
export function HeroIllustration() {
  return (
    <figure className="relative p-4 sm:p-6">
      <svg
        className="h-auto w-full touch-manipulation overflow-visible text-muted-foreground/70"
        viewBox="0 0 480 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M-1 1l2-2M0 8l8-8M7 9l2-2" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          </pattern>
        </defs>

        {/* faint dashed backdrop lines */}
        <g stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 3">
          <path d="M-40 210 L520 10" />
          <path d="M-40 40 L520 200" />
        </g>

        {/* interlocking isometric block cluster */}
        <g stroke="currentColor" strokeWidth="1">
          <path d="M120 60 L200 20 L280 60 L280 120 L200 160 L120 120 Z" fill="url(#hero-hatch)" />
          <path d="M120 60 L200 100 L200 160" />
          <path d="M280 60 L200 100" />

          <path d="M260 100 L340 60 L420 100 L420 160 L340 200 L260 160 Z" fill="url(#hero-hatch)" />
          <path d="M260 100 L340 140 L340 200" />
          <path d="M420 100 L340 140" />
        </g>
      </svg>

      <figcaption className="pointer-events-none absolute right-4 bottom-2 font-mono text-xs tracking-wide text-muted-foreground/60 sm:right-6">
        Fig. 1.
      </figcaption>
    </figure>
  )
}

export default HeroIllustration
