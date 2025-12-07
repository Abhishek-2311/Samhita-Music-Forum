import { Variants } from 'framer-motion'

export type FadeDirection = 'up' | 'down' | 'left' | 'right'

export const fadeIn = (direction: FadeDirection = 'up', delay = 0): Variants => {
  const distance = 40
  const fromY = direction === 'up' ? distance : direction === 'down' ? -distance : 0
  const fromX = direction === 'left' ? distance : direction === 'right' ? -distance : 0

  return {
    hidden: {
      opacity: 0,
      x: fromX,
      y: fromY,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
    },
  },
}

export const zoomIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const hoverCardMotion = {
  whileHover: { y: -6, boxShadow: '0 15px 35px -15px rgba(15, 23, 42, 0.35)' },
  whileTap: { scale: 0.98 },
}
