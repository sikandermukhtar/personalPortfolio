export type Locale = 'en'

export const defaultLocale: Locale = 'en'

export const sectionSlugs = ['projects', 'experience', 'contact', 'resume'] as const

export type SectionSlug = (typeof sectionSlugs)[number]

const sectionSet = new Set<string>(sectionSlugs)

export function isSectionSlug(value: string): value is SectionSlug {
  return sectionSet.has(value)
}

export function getSectionFromPathname(pathname: string): SectionSlug | null {
  const segments = pathname.split('/').filter(Boolean)
  const candidate = segments[0]
  return candidate && isSectionSlug(candidate) ? candidate : null
}

export function buildSectionPath(section?: SectionSlug) {
  return section ? `/${section}` : '/'
}

export function isDetailPath(pathname: string, section: 'blog' | 'projects') {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] === section && segments.length > 1
}
