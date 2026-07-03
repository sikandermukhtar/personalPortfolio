import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import {
  getAllLocalContent,
  getFrontmatterTitle,
  getLocalContent,
  type ContentSection,
  type ContentLayout,
} from './mdx-content'

export type ProjectSection = ContentSection

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  content?: MDXRemoteSerializeResult
  layout: ContentLayout
  projectUrl?: string
  githubUrl?: string
  technologies: string[]
  imageUrl?: string
  features?: string[]
  detailSections?: ProjectSection[]
  challenges?: string[]
  lessons?: string[]
}

function mergeProjectMetadata(
  canonicalSlug: string,
  localProject: Awaited<ReturnType<typeof getAllLocalContent>>[number],
) {
  const frontmatter = localProject.frontmatter

  return {
    _id: canonicalSlug,
    title: getFrontmatterTitle(frontmatter, canonicalSlug),
    slug: frontmatter.slug ?? canonicalSlug,
    description: frontmatter.description ?? '',
    projectUrl: frontmatter.projectUrl,
    githubUrl: frontmatter.githubUrl,
    technologies: frontmatter.technologies ?? [],
    imageUrl: frontmatter.imageUrl,
    features: frontmatter.features,
    detailSections: frontmatter.detailSections,
    challenges: frontmatter.challenges,
    lessons: frontmatter.lessons,
    layout: frontmatter?.layout ?? 'mdx',
  } satisfies Omit<Project, 'content'>
}

export async function getProjects(): Promise<Project[]> {
  const localProjects = await getAllLocalContent('projects')

  return localProjects.map((localProject) => {
    return {
      ...mergeProjectMetadata(localProject.canonicalSlug, localProject),
      content: localProject.serialized,
    }
  })
}

export async function getProject(slug: string): Promise<Project | null> {
  const localProject = await getLocalContent('projects', slug)

  if (!localProject) {
    return null
  }

  return {
    ...mergeProjectMetadata(localProject.canonicalSlug, localProject),
    content: localProject.serialized,
  }
}

/*
SANITY CMS PAUSED

The Projects system now reads local MDX plus src/data/projects.ts metadata. This
keeps project pages code-controlled while preserving the old Sanity query contract
for a future reconnect.

import { sanityFetch } from './sanity.client'

const localeFieldSuffix: Record<Locale, 'En' | 'Es' | 'De' | 'Ur'> = {
  en: 'En',
  es: 'Es',
  de: 'De',
  ur: 'Ur',
}

export async function getProjectsFromSanity(locale: Locale = 'en') {
  const suffix = localeFieldSuffix[locale]
  const query = `
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      "title": coalesce(title${suffix}, titleEn),
      "slug": coalesce(slug${suffix}.current, slugEn.current),
      "description": coalesce(description${suffix}, descriptionEn),
      projectUrl,
      githubUrl,
      technologies,
      "imageUrl": imageUrl,
      "features": coalesce(features${suffix}, featuresEn),
      "challenges": coalesce(challenges${suffix}, challengesEn),
      "lessons": coalesce(lessons${suffix}, lessonsEn)
    }
  `
  return sanityFetch(query)
}

export async function getProjectFromSanity(slug: string, locale: Locale = 'en') {
  const suffix = localeFieldSuffix[locale]
  const query = `
    *[_type == "project" && (
      slugEn.current == $slug ||
      slugEs.current == $slug ||
      slugDe.current == $slug ||
      slugUr.current == $slug
    )][0] {
      _id,
      "title": coalesce(title${suffix}, titleEn),
      "slug": coalesce(slug${suffix}.current, slugEn.current),
      "description": coalesce(description${suffix}, descriptionEn),
      "content": coalesce(content${suffix}, contentEn),
      "slugEn": slugEn.current,
      "slugEs": slugEs.current,
      "slugDe": slugDe.current,
      "slugUr": slugUr.current,
      projectUrl,
      githubUrl,
      technologies,
      "imageUrl": imageUrl,
      "features": coalesce(features${suffix}, featuresEn),
      "challenges": coalesce(challenges${suffix}, challengesEn),
      "lessons": coalesce(lessons${suffix}, lessonsEn)
    }
  `
  return sanityFetch(query, { slug })
}
*/
