import path from 'path'
import { promises as fs } from 'fs'
import type { Dirent } from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

export type ContentKind = 'posts' | 'projects'
export type ContentLayout = 'mdx' | 'react'

export interface ContentSection {
  title: string
  items: string[]
  imageUrl?: string
}

export interface ContentFrontmatter {
  title?: string
  slug?: string
  publishedAt?: string
  category?: 'technical' | 'general'
  excerpt?: string
  description?: string
  imageUrl?: string
  order?: number
  draft?: boolean
  layout?: ContentLayout
  component?: string
  projectUrl?: string
  githubUrl?: string
  technologies?: string[]
  features?: string[]
  detailSections?: ContentSection[]
  challenges?: string[]
  lessons?: string[]
}

export interface LocalContentDocument {
  canonicalSlug: string
  slug: string
  frontmatter: ContentFrontmatter
  serialized: MDXRemoteSerializeResult
}

interface ContentEntry {
  canonicalSlug: string
  filePath: string
}

const contentRoot = path.join(process.cwd(), 'content')

async function readDirents(directory: string): Promise<Dirent[]> {
  try {
    return await fs.readdir(directory, { withFileTypes: true })
  } catch {
    return []
  }
}

async function readFileNames(directory: string): Promise<string[]> {
  try {
    return await fs.readdir(directory)
  } catch {
    return []
  }
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

async function getEntries(kind: ContentKind): Promise<ContentEntry[]> {
  const directory = path.join(contentRoot, kind)
  const items = await readDirents(directory)
  const entries: ContentEntry[] = []

  for (const item of items) {
    if (item.isDirectory()) {
      const entryDirectory = path.join(directory, item.name)
      const files = await readFileNames(entryDirectory)
      let filePath: string | null = null

      for (const file of files) {
        if (file === 'index.mdx' || file === 'index.en.mdx') {
          filePath = path.join(entryDirectory, file)
          break
        }
      }

      if (filePath) {
        entries.push({ canonicalSlug: item.name, filePath })
      }
    }

    if (item.isFile() && item.name.endsWith('.mdx')) {
      const canonicalSlug = item.name.replace(/\.mdx$/, '')
      entries.push({
        canonicalSlug,
        filePath: path.join(directory, item.name),
      })
    }
  }

  return entries
}

async function readDocument(entry: ContentEntry): Promise<LocalContentDocument | null> {
  const file = await fs.readFile(entry.filePath, 'utf8')
  const { data, content } = matter(file)
  const frontmatter = data as ContentFrontmatter
  const serialized = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            keepBackground: false,
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
          },
        ],
      ],
    },
  })

  return {
    canonicalSlug: entry.canonicalSlug,
    slug: frontmatter.slug ?? entry.canonicalSlug,
    frontmatter,
    serialized,
  }
}

export async function getAllLocalContent(kind: ContentKind) {
  const entries = await getEntries(kind)
  const documents = await Promise.all(entries.map((entry) => readDocument(entry)))

  return documents
    .filter((document): document is LocalContentDocument => Boolean(document))
    .filter((document) => !document.frontmatter.draft)
}

export async function getLocalContent(kind: ContentKind, slug: string) {
  const entries = await getEntries(kind)

  for (const entry of entries) {
    const candidate = await readDocument(entry)
    if (!candidate || candidate.frontmatter.draft) {
      continue
    }

    const localizedSlug = candidate.frontmatter.slug ?? candidate.canonicalSlug
    const englishSlug = entry.canonicalSlug

    if (slug === localizedSlug || slug === englishSlug) {
      return candidate
    }
  }

  return null
}

export function getFrontmatterTitle(frontmatter: ContentFrontmatter, fallbackSlug: string) {
  return frontmatter.title ?? titleFromSlug(fallbackSlug)
}
