'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button as HeroUIButton, ButtonProps, Spinner } from '@heroui/react'
import { cn, EASE_OUT } from '@/lib'
import type { PressEvent } from '@react-types/shared'

// HeroUIButton's native `onAnimationStart`/`onDrag*` DOM handler types collide
// with Framer Motion's gesture props of the same name — cast away the prop
// type here since callers go through `CustomButtonProps` below, not this.
const MotionButton = motion.create(HeroUIButton as unknown as React.ComponentType<Record<string, unknown>>)

type CustomButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
type NormalSizes = 'sm' | 'md' | 'lg'
type ButtonVariants = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'

interface CustomButtonProps
  extends Omit<ButtonProps, 'color' | 'size' | 'disabled' | 'variant' | 'isLoading' | 'onClick' | 'onPress'> {
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
  onClick?: (e: PressEvent) => void
  color?: CustomButtonColor
  size?: NormalSizes
  className?: string
  loading?: boolean
  children?: React.ReactNode
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  variant?: ButtonVariants
}

const Button: React.FC<CustomButtonProps> = ({
  type = 'button',
  isDisabled = false,
  onClick,
  color = 'default',
  size = 'md',
  className,
  loading = false,
  children,
  startContent,
  endContent,
  variant = 'solid',
  ...rest
}) => {
  const buttonClasses = cn(
    'px-4 text-sm font-medium',
    color === 'default' && variant === 'solid' && 'bg-foreground text-background hover:opacity-90',
    'transition-colors duration-300 ease-in-out',
    className,
    { 'cursor-not-allowed opacity-60': isDisabled && !loading }
  )

  const isInteractive = !isDisabled && !loading

  return (
    <MotionButton
      type={type}
      isDisabled={isDisabled || loading}
      isLoading={loading}
      spinner={<Spinner color="current" size="sm" />}
      onPress={onClick}
      color={color}
      variant={variant}
      size={size}
      className={buttonClasses}
      startContent={loading ? undefined : startContent}
      endContent={loading ? undefined : endContent}
      whileHover={isInteractive ? { scale: 1.02 } : undefined}
      whileTap={isInteractive ? { scale: 0.96 } : undefined}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </MotionButton>
  )
}

export default Button
