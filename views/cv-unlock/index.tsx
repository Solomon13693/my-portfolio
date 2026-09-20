import { UnlockForm } from './UnlockForm'

export function UnlockView() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-8 py-16 text-center">
      <div>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">CV Lab</p>
        <div className="mx-auto mt-3 h-px w-10 bg-foreground" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">Enter passcode</h1>
        <p className="mt-2 text-sm text-muted-foreground">This tool is private.</p>
      </div>

      <UnlockForm />
    </div>
  )
}

export default UnlockView
