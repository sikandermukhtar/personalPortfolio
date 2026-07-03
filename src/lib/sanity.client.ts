/*
SANITY CMS PAUSED

Blog and Project pages now read from local MDX/React content. Keep this client as
the reconnect point if Sanity returns later.

import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function sanityFetch<T>(query: string, params?: Record<string, string | number>): Promise<T> {
  try {
    return await client.fetch<T>(query, params as any)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return [] as T
  }
}
*/

export {}
