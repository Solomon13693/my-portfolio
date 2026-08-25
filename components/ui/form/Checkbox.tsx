'use client'

import React, { ReactNode } from 'react'
import { cn } from '@/lib'
import ErrorMessage from './ErrorMessage'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | ReactNode
  name: string
  className?: string
  formGroupClass?: string
  labelClassName?: string
  error?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  className,
  formGroupClass,
  labelClassName,
  error,
  checked,
  onChange,
  ...props
}) => {
  return (
    <div className={cn('form-group', formGroupClass)}>
      <label className={cn('flex items-center gap-3 cursor-pointer', labelClassName)}>
        <input
          {...props}
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className={cn(
            'w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500',
            error && 'border-red-500',
            className
          )}
        />
        {label && <span className="text-xs text-gray-700">{label}</span>}
      </label>
      <ErrorMessage error={error} />
    </div>
  )
}

export default Checkbox
