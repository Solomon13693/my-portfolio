import React, { ReactNode } from 'react'
import { cn } from '@/lib'

interface LabelProps {
  htmlFor: string
  label: string | ReactNode
  className?: string
}

const Label: React.FC<LabelProps> = ({ htmlFor, label, className }) => (
  <label htmlFor={htmlFor} className={cn('form-label', className)}>
    {label}
  </label>
)

export default Label
