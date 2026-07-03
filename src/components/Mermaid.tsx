'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const renderDiagram = async () => {
      // Skip if chart is empty
      if (!chart || !chart.trim()) {
        return
      }

      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          flowchart: { useMaxWidth: true, htmlLabels: true },
          sequence: { useMaxWidth: true },
        })

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim())
        
        if (mounted) {
          setSvg(renderedSvg)
          setError(null)
        }
      } catch (err) {
        console.error('Mermaid render error:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
        }
      }
    }

    renderDiagram()

    return () => {
      mounted = false
    }
  }, [chart])

  if (error) {
    return (
      <div className="my-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-mono overflow-x-auto">
        <p className="font-bold mb-2">Diagram Error:</p>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs">Raw chart content</summary>
          <pre className="mt-1 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">{chart}</pre>
        </details>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
        Loading diagram...
      </div>
    )
  }

  return (
    <div 
      className="my-8 flex justify-center bg-white dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700 [&_svg]:max-w-full" 
      ref={ref}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
