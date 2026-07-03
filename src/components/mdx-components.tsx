'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import mermaid from 'mermaid'

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' })
    if (ref.current) {
      mermaid.contentLoaded()
    }
  }, [chart])

  return (
    <div className="mermaid my-8 flex justify-center bg-white dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700" ref={ref}>
      {chart}
    </div>
  )
}

const InteractiveDiagram = () => {
  return (
    <div className="my-8 p-6 bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md text-center">
      <h4 className="font-mono text-sm mb-4">Interactive Component Placeholder</h4>
      <div className="flex gap-4 justify-center">
        <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-sm text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors" onClick={() => alert('Interaction 1')}>Action A</button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-sm text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => alert('Interaction 2')}>Action B</button>
      </div>
    </div>
  )
}

export const components = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6 mt-12" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-4 mt-10" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-4 mt-8" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-6 text-pretty" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc ps-6 mb-6 space-y-2 text-gray-800 dark:text-gray-200 text-lg" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal ps-6 mb-6 space-y-2 text-gray-800 dark:text-gray-200 text-lg" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-s-4 border-gray-400 dark:border-gray-600 ps-6 py-2 italic text-gray-600 dark:text-gray-400 my-8 text-xl" {...props} />
  ),
  hr: () => <hr className="my-12 border-gray-200 dark:border-gray-800" />,
  a: ({ href = '#', ...props }: ComponentPropsWithoutRef<'a'>) => <Link href={href} className="text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-black dark:hover:decoration-white transition-colors" {...props} />,
  img: ({ src = '', alt = '' }: ComponentPropsWithoutRef<'img'>) => (
    <div className="my-12 relative aspect-video w-full overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-800">
      <Image src={String(src)} alt={alt} fill className="object-cover" />
    </div>
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="font-mono text-sm bg-white dark:bg-black p-6 rounded-md border border-gray-200 dark:border-gray-800 overflow-x-auto my-8 shadow-sm" {...props} />
  ),
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    if (className === 'language-mermaid') {
      return <Mermaid chart={String(children ?? '')} />
    }

    return <code {...props} className={`${className ?? ''} font-mono bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded-sm text-black dark:text-white`}>{children}</code>
  },
  InteractiveDiagram,
}
