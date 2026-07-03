import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import {
  getAllLocalContent,
  getFrontmatterTitle,
  getLocalContent,
  type ContentLayout,
} from './mdx-content'

export interface PostMetadata {
  title: string
  publishedAt: string
  category: 'technical' | 'general'
  excerpt: string
  imageUrl?: string
  slug: string
  layout: ContentLayout
  component?: string
}

export interface Post extends PostMetadata {
  content?: MDXRemoteSerializeResult
}

export async function getPosts(): Promise<PostMetadata[]> {
  const posts = await getAllLocalContent('posts')

  return posts
    .map((post) => ({
      title: getFrontmatterTitle(post.frontmatter, post.canonicalSlug),
      publishedAt: post.frontmatter.publishedAt ?? '1970-01-01',
      category: post.frontmatter.category ?? 'general',
      excerpt: post.frontmatter.excerpt ?? '',
      imageUrl: post.frontmatter.imageUrl,
      slug: post.slug,
      layout: post.frontmatter.layout ?? 'mdx',
      component: post.frontmatter.component,
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const post = await getLocalContent('posts', slug)

  if (!post) {
    return null
  }

  return {
    title: getFrontmatterTitle(post.frontmatter, post.canonicalSlug),
    publishedAt: post.frontmatter.publishedAt ?? '1970-01-01',
    category: post.frontmatter.category ?? 'general',
    excerpt: post.frontmatter.excerpt ?? '',
    imageUrl: post.frontmatter.imageUrl,
    slug: post.slug,
    layout: post.frontmatter.layout ?? 'mdx',
    component: post.frontmatter.component,
    content: post.serialized,
  }
}

/*
SANITY CMS PAUSED

The Blog system now reads local MDX/React content from content/posts so articles can
control code snippets, images, scrollytelling, and custom React interactions. Keep
this query shape as the reconnect map if Sanity becomes useful again later.

import { sanityFetch } from './sanity.client'

const localeFieldSuffix: Record<Locale, 'En' | 'Es' | 'De' | 'Ur'> = {
  en: 'En',
  es: 'Es',
  de: 'De',
  ur: 'Ur',
}

export async function getPostsFromSanity(locale: Locale = 'en') {
  const suffix = localeFieldSuffix[locale]
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
      "title": coalesce(title${suffix}, titleEn),
      publishedAt,
      category,
      "excerpt": coalesce(excerpt${suffix}, excerptEn),
      "slug": coalesce(slug${suffix}.current, slugEn.current),
      "imageUrl": imageUrl
    }
  `
  return sanityFetch(query)
}

export async function getPostFromSanity(slug: string, locale: Locale = 'en') {
  const suffix = localeFieldSuffix[locale]
  const query = `
    *[_type == "blogPost" && (
      slugEn.current == $slug ||
      slugEs.current == $slug ||
      slugDe.current == $slug ||
      slugUr.current == $slug
    )][0] {
      "title": coalesce(title${suffix}, titleEn),
      publishedAt,
      category,
      "excerpt": coalesce(excerpt${suffix}, excerptEn),
      "content": coalesce(content${suffix}, contentEn),
      "slug": coalesce(slug${suffix}.current, slugEn.current),
      "slugEn": slugEn.current,
      "slugEs": slugEs.current,
      "slugDe": slugDe.current,
      "slugUr": slugUr.current,
      "imageUrl": imageUrl
    }
  `
  return sanityFetch(query, { slug })
}
*/
