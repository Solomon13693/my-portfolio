'use client'

import { Input } from '@/components/ui/form'
import Button from '@/components/ui/button'
import type { CoverLetterPlaceholderValues } from '@/types'

interface PlaceholderFormProps {
  values: CoverLetterPlaceholderValues
  onChange: (values: CoverLetterPlaceholderValues) => void
  onApply: () => void
}

export function PlaceholderForm({ values, onChange, onApply }: PlaceholderFormProps) {
  const setField = (field: keyof CoverLetterPlaceholderValues, value: string) => {
    onChange({ ...values, [field]: value })
  }

  return (
    <div>
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">This application</p>
      <div className="mt-3 grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <Input label="Company" name="company" radius="none" value={values.company} onChange={(e) => setField('company', e.target.value)} />
        <Input label="Role" name="role" radius="none" value={values.role} onChange={(e) => setField('role', e.target.value)} />
        <Input
          label="Hiring manager (optional)"
          name="hiringManager"
          radius="none"
          value={values.hiringManager ?? ''}
          onChange={(e) => setField('hiringManager', e.target.value)}
        />
        <Input
          label="Job posting URL (optional)"
          name="jobPostingUrl"
          radius="none"
          value={values.jobPostingUrl ?? ''}
          onChange={(e) => setField('jobPostingUrl', e.target.value)}
        />
      </div>
      <Button size="sm" variant="bordered" className="mt-3 rounded-none" onClick={onApply}>
        Apply to letter
      </Button>
    </div>
  )
}

export default PlaceholderForm
