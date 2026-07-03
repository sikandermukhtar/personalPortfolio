/*
SANITY CMS PAUSED

Blog posts now use local MDX/React files. Keep this schema as the reconnect map
for the old localized Sanity document structure.

import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'slugEn',
      title: 'Slug (English)',
      type: 'slug',
      options: { source: 'titleEn', maxLength: 96 },
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slugEs',
      title: 'Slug (Spanish)',
      type: 'slug',
      options: { source: 'titleEs', maxLength: 96 },
      group: 'es',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slugDe',
      title: 'Slug (German)',
      type: 'slug',
      options: { source: 'titleDe', maxLength: 96 },
      group: 'de',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slugUr',
      title: 'Slug (Urdu)',
      type: 'slug',
      options: { source: 'titleUr', maxLength: 96 },
      group: 'ur',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEs',
      title: 'Title (Spanish)',
      type: 'string',
      group: 'es',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleDe',
      title: 'Title (German)',
      type: 'string',
      group: 'de',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleUr',
      title: 'Title (Urdu)',
      type: 'string',
      group: 'ur',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (English)',
      type: 'text',
      rows: 3,
      group: 'en',
    }),
    defineField({
      name: 'excerptEs',
      title: 'Excerpt (Spanish)',
      type: 'text',
      rows: 3,
      group: 'es',
    }),
    defineField({
      name: 'excerptDe',
      title: 'Excerpt (German)',
      type: 'text',
      rows: 3,
      group: 'de',
    }),
    defineField({
      name: 'excerptUr',
      title: 'Excerpt (Urdu)',
      type: 'text',
      rows: 3,
      group: 'ur',
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'en',
    }),
    defineField({
      name: 'contentEs',
      title: 'Content (Spanish)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'es',
    }),
    defineField({
      name: 'contentDe',
      title: 'Content (German)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'de',
    }),
    defineField({
      name: 'contentUr',
      title: 'Content (Urdu)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'ur',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technical', value: 'technical' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
    }),
  ],
  groups: [
    { name: 'en', title: 'English', default: true },
    { name: 'es', title: 'Spanish' },
    { name: 'de', title: 'German' },
    { name: 'ur', title: 'Urdu' },
  ],
})
*/

export {}
