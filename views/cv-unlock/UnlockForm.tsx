'use client'

import { useActionState } from 'react'
import { unlockCvLabAction, type UnlockCvLabState } from '@/lib/cv-auth-actions'
import { Input, ErrorMessage } from '@/components/ui/form'
import Button from '@/components/ui/button'

const INITIAL_STATE: UnlockCvLabState = {}

export function UnlockForm() {
  const [state, formAction, pending] = useActionState(unlockCvLabAction, INITIAL_STATE)

  return (
    <form action={formAction} className="w-full max-w-sm">
      <Input
        label="Passcode"
        name="passcode"
        type="password"
        placeholder="••••••••"
        autoFocus
        disabled={pending}
        radius="none"
      />

      <div className="mt-4">
        <Button type="submit" loading={pending} className="w-full font-normal rounded-none">
          Unlock
        </Button>
        <div role="alert" aria-live="polite">
          <ErrorMessage error={state.error} />
        </div>
      </div>
    </form>
  )
}

export default UnlockForm
