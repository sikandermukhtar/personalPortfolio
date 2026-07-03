'use client'

import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import InteractiveDiagram from './InteractiveDiagram'
import Mermaid from './Mermaid'
import CopyButton from './CopyButton'

interface MDXContentProps {
  serialized: MDXRemoteSerializeResult
  variant?: 'default' | 'compact'
}

type PreProps = ComponentPropsWithoutRef<'pre'> & {
  'data-language'?: string
}

function getCodeFromChildren(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children.map(getCodeFromChildren).join('')
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getCodeFromChildren(children.props.children)
  }

  return ''
}

function Pre({ children, ...props }: PreProps) {
  const codeText = getCodeFromChildren(children)
  const dataLang = props['data-language']

  if (dataLang === 'mermaid') {
    return <Mermaid chart={codeText} />
  }

  return (
    <div className="relative group my-8 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
      <pre {...props} className="p-4 overflow-x-auto text-sm [&>code]:font-mono [&>code]:text-sm">
        {children}
      </pre>
      <CopyButton code={codeText} />
    </div>
  )
}

export default function MDXContent({ serialized, variant = 'default' }: MDXContentProps) {
  const isCompact = variant === 'compact'

  return (
    <MDXRemote
      {...serialized}
      components={{
        h1: (props: ComponentPropsWithoutRef<'h1'>) => (
          <h1 className={`${isCompact ? 'mt-10 mb-4 text-xl md:text-2xl' : 'mb-6 mt-12 text-2xl md:text-3xl'} font-sans font-semibold tracking-tight text-balance`} {...props} />
        ),
        h2: (props: ComponentPropsWithoutRef<'h2'>) => (
          <h2 className={`${isCompact ? 'mt-8 mb-3 text-lg md:text-xl' : 'mb-4 mt-10 text-xl md:text-2xl'} font-sans font-semibold tracking-tight text-balance`} {...props} />
        ),
        h3: (props: ComponentPropsWithoutRef<'h3'>) => (
          <h3 className={`${isCompact ? 'mt-7 mb-3 text-base md:text-lg' : 'mb-4 mt-8 text-lg md:text-xl'} font-sans font-semibold tracking-tight text-balance`} {...props} />
        ),
        p: (props: ComponentPropsWithoutRef<'p'>) => (
          <p className={`${isCompact ? 'mb-4 text-sm leading-6' : 'mb-6 text-base leading-7'} text-gray-800 text-pretty dark:text-gray-200`} {...props} />
        ),
        ul: (props: ComponentPropsWithoutRef<'ul'>) => (
          <ul className={`${isCompact ? 'mb-4 space-y-1.5 text-sm leading-6' : 'mb-6 space-y-2 text-base leading-7'} list-disc ps-6 text-gray-800 dark:text-gray-200`} {...props} />
        ),
        ol: (props: ComponentPropsWithoutRef<'ol'>) => (
          <ol className={`${isCompact ? 'mb-4 space-y-1.5 text-sm leading-6' : 'mb-6 space-y-2 text-base leading-7'} list-decimal ps-6 text-gray-800 dark:text-gray-200`} {...props} />
        ),
        li: (props: ComponentPropsWithoutRef<'li'>) => <li {...props} />,
        blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
          <blockquote className={`${isCompact ? 'my-6 text-base' : 'my-8 text-xl'} border-s-4 border-gray-400 py-2 ps-6 italic text-gray-600 dark:border-gray-600 dark:text-gray-400`} {...props} />
        ),
        hr: () => <hr className={`${isCompact ? 'my-8' : 'my-12'} border-gray-200 dark:border-gray-800`} />,
        a: ({ href = '#', ...props }: ComponentPropsWithoutRef<'a'>) => (
          <Link href={href} className="text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-black dark:hover:decoration-white transition-colors" {...props} />
        ),
        img: ({ src = '', alt = '' }: ComponentPropsWithoutRef<'img'>) => (
          <div className={`${isCompact ? 'my-8' : 'my-12'} relative aspect-video w-full overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-800`}>
            <Image src={String(src)} alt={alt} fill className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10" />
          </div>
        ),
        figure: (props: ComponentPropsWithoutRef<'figure'>) => (
          <figure {...props} className="my-8 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800" />
        ),
        pre: Pre,
        code: (props: ComponentPropsWithoutRef<'code'>) => <code {...props} />,
        InteractiveDiagram,
        Mermaid,
      }}
    />
  )
}
