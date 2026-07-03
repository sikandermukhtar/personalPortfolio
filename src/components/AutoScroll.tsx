"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getSectionFromPathname } from '@/lib/site-routing'

export function AutoScroll() {
    const pathname = usePathname()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const section = getSectionFromPathname(pathname)

            if (section) {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                return
            }

            if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [pathname])

    return null
}
