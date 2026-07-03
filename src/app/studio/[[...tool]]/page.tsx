export default function StudioPausedPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
          Sanity CMS paused
        </p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">Studio is disconnected for now.</h1>
        <p className="mt-6 text-pretty text-lg leading-8 text-gray-600 dark:text-gray-400">
          Blog and project content now lives in local MDX and custom React article modules. See
          docs/sanity.md for the reconnect checklist.
        </p>
      </div>
    </main>
  )
}

/*
SANITY CMS PAUSED

To reconnect the Studio, restore these imports and render the NextStudio component:

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
*/
