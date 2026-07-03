interface SiteFooterProps {
  name: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
}

export function SiteFooter({ name, email, githubUrl, linkedinUrl }: SiteFooterProps) {
  return (
    <footer className="mt-auto flex flex-nowrap items-center justify-between gap-x-3 border-t border-gray-200 py-6 text-start font-mono text-[11px] text-gray-400 dark:border-gray-800 dark:text-gray-500 sm:gap-x-5 sm:text-sm">
      <p className="font-serif text-sm tracking-tight text-black dark:text-white sm:text-base">{name}</p>
      <div className="ms-auto flex shrink-0 items-center justify-end gap-x-2 text-end sm:gap-x-4">
        {email && <a href={`mailto:${email}`} className="hover:text-black dark:hover:text-white transition-colors">Email</a>}
        {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>}
        {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>}
      </div>
    </footer>
  )
}
