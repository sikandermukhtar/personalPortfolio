"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { buildSectionPath, getSectionFromPathname, type SectionSlug } from '@/lib/site-routing'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: SectionSlug | 'top', urlPath: string) => {
    e.preventDefault()

    const currentSection = getSectionFromPathname(pathname)
    const isHomeShell = pathname === '/' || currentSection !== null

    if (!isHomeShell) {
      router.push(urlPath)
      return
    }

    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', urlPath)
    } else {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', urlPath)
      } else {
        router.push(urlPath)
      }
    }
  }

  return (
    <header className="-mx-6 -mt-6 mb-10 flex flex-col gap-5 bg-transparent px-6 pt-4 pb-3 lg:-mx-12 lg:-mt-12 lg:px-12 lg:pt-6 lg:pb-4">
      <div className="flex items-center justify-between gap-3 pe-36 sm:pe-44">
        <span data-state="closed" className="min-w-0 flex-1">
          <Link className="block truncate text-lg sm:text-xl md:text-2xl font-serif tracking-tight" href="/">
            Sikander Mukhtar
          </Link>
        </span>
      </div>
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex w-full justify-end px-6 md:w-[50%] lg:top-6 lg:px-12">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono">
        <a href={buildSectionPath()} onClick={(e) => handleScroll(e, 'top', buildSectionPath())} className="cursor-pointer underline underline-offset-8 hover:decoration-2 decoration-2 hover:decoration-black dark:hover:decoration-white hover:text-black dark:hover:text-white transition-colors">Home</a>
        <a href={buildSectionPath('projects')} onClick={(e) => handleScroll(e, 'projects', buildSectionPath('projects'))} className="cursor-pointer underline underline-offset-8 hover:decoration-2 hover:decoration-black/50 hover:text-black/70 dark:hover:text-white transition-colors">Projects</a>
        <a href={buildSectionPath('experience')} onClick={(e) => handleScroll(e, 'experience', buildSectionPath('experience'))} className="cursor-pointer underline underline-offset-8 hover:decoration-2 hover:decoration-black/50 hover:text-black/70 dark:hover:text-white transition-colors">Experience</a>
        <a href={buildSectionPath('contact')} onClick={(e) => handleScroll(e, 'contact', buildSectionPath('contact'))} className="cursor-pointer underline underline-offset-8 hover:decoration-2 hover:decoration-black/50 hover:text-black/70 dark:hover:text-white transition-colors">Contact</a>
        <a href={buildSectionPath('resume')} onClick={(e) => handleScroll(e, 'resume', buildSectionPath('resume'))} className="cursor-pointer underline underline-offset-8 hover:decoration-2 hover:decoration-black/50 hover:text-black/70 dark:hover:text-white transition-colors">Resume</a>
      </div>
    </header>
  )
}
