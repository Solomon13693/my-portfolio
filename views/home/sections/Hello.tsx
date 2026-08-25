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
          I&apos;m Solomon. I build software that solves real problems and keeps working after launch.
        </p>

        <p className="max-w-2xl text-muted-foreground">
          I&apos;m a Software Developer who builds web and mobile applications, APIs,
          dashboards, and the systems behind them. I work across React Native, React,
          Next.js, Laravel, Node.js, and other modern technologies, choosing the right
          tools for the problem rather than limiting myself to a single stack.
        </p>

        <p className="max-w-2xl text-muted-foreground">
          I enjoy taking ideas from product requirements to production understanding
          what needs to be built, designing practical solutions, writing maintainable
          code, integrating the different pieces of a system, and making sure the final
          product is reliable, performant, and ready for real users. For me, shipping
          isn&apos;t the finish line. Good software should be something that can grow,
          be maintained, and continue delivering value long after launch.
        </p>

      </div>

    </div>
  )
}

export default Hello
