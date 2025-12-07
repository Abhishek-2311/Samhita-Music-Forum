'use client'

import { ElementType, HTMLAttributes, ReactNode } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { FadeDirection, fadeIn, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

type PolymorphicTag = keyof HTMLElementTagNameMap

interface AnimatedSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: PolymorphicTag
}

export function AnimatedSection({
  children,
  className,
  as: Component = 'section',
  ...props
}: AnimatedSectionProps) {
  const MotionComponent = motion(Component as ElementType)

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
      className={className}
      {...(props as MotionProps)}
    >
      {children}
    </MotionComponent>
  )
}

interface AnimatedItemProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  direction?: FadeDirection
  delay?: number
  as?: PolymorphicTag
}

export function AnimatedItem({
  children,
  className,
  direction = 'up',
  delay = 0,
  as: Component = 'div',
  ...props
}: AnimatedItemProps) {
  const MotionComponent = motion(Component as ElementType)

  return (
    <MotionComponent
      variants={fadeIn(direction, delay)}
      className={cn(className)}
      {...(props as MotionProps)}
    >
      {children}
    </MotionComponent>
  )
}
