/*
SANITY CMS PAUSED

Portable Text rendering is no longer used by Blog or Project pages. Keep this
file as the reconnect location if Sanity content bodies return.

'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  // Restore the previous block, mark, list, and listItem mappings here.
}

export function PortableTextContent({ value }: { value: any[] }) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null
  }

  return (
    <div className="max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
*/

export {}
