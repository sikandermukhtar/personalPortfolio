'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

type HoverBorderGradientProps<T extends React.ElementType> = {
  as?: T
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']

const movingMap: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, currentColor 0%, transparent 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, currentColor 0%, transparent 100%)',
  BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, currentColor 0%, transparent 100%)',
  RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, currentColor 0%, transparent 100%)',
}

const highlight =
  'radial-gradient(75% 181.15942028985506% at 50% 50%, currentColor 0%, transparent 100%)'

export function HoverBorderGradient<T extends React.ElementType = 'button'>({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps<T>) {
  const Tag = as ?? 'button'
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  useEffect(() => {
    if (hovered) {
      return
    }

    const interval = window.setInterval(() => {
      setDirection((currentDirection) => {
        const currentIndex = directions.indexOf(currentDirection)
        const nextIndex = clockwise
          ? (currentIndex - 1 + directions.length) % directions.length
          : (currentIndex + 1) % directions.length

        return directions[nextIndex]
      })
    }, duration * 1000)

    return () => window.clearInterval(interval)
  }, [clockwise, duration, hovered])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col items-center justify-center overflow-visible rounded-full bg-black/10 p-px text-black decoration-clone transition-[scale,background-color] duration-300 ease-out hover:bg-black/15 active:scale-[0.96] dark:bg-white/15 dark:text-white dark:hover:bg-white/20',
        containerClassName,
      )}
      {...props}
    >
      <div className={cn('z-10 w-auto rounded-[inherit] bg-white px-4 py-2 text-black dark:bg-black dark:text-white', className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration }}
      />
      <div className="absolute inset-[2px] z-[1] flex-none rounded-[100px] bg-white dark:bg-black" />
    </Tag>
  )
}
