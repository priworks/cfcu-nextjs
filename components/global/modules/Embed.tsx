import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { clsx } from 'clsx'
import DOMPurify from 'isomorphic-dompurify'
import { stegaClean } from '@sanity/client/stega'
import Script from 'next/script'

import ErrorBoundary from './ErrorBoundary'
import { EmbedType } from '@/types/sanity'

function extractScriptContent(content: any) {
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi
  let scriptContent = ''
  let remainingContent = content

  const scripts = content.match(scriptRegex)

  if (scripts) {
    scripts.forEach((script: any) => {
      const match = script.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)
      if (match && match[1]) {
        scriptContent += match[1] + '\n'
      }
      remainingContent = remainingContent.replace(script, '')
    })
  }
  return {
    scriptContent: scriptContent.trim(),
    remainingContent: remainingContent.trim(),
  }
}

export default function SanitizedEmbed({
  embed,
  isGlobal = false,
}: {
  embed: EmbedType
  isGlobal?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const loadedScriptsRef = useRef<HTMLScriptElement[]>([])
  const scriptDomainsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    const scriptDomains = scriptDomainsRef.current
    const loadedScripts = loadedScriptsRef.current

    if (!container || !embed?.scriptsForBody?.length) return

    // Configure DOMPurify
    DOMPurify.setConfig({
      ADD_TAGS: ['iframe', 'script'],
      ADD_ATTR: [
        'src',
        'class',
        'frameborder',
        'allowfullscreen',
        'id',
        'async',
        'data-access_code',
        'data-cc',
        'data-env',
      ],
      FORCE_BODY: true,
    })

    // Clear previous content
    container.innerHTML = ''

    // Process each script
    embed.scriptsForBody.forEach((scriptContent) => {
      const sanitized = DOMPurify.sanitize(stegaClean(scriptContent.trim()))

      // Create a div to hold the sanitized content
      const scriptContainer = document.createElement('div')
      scriptContainer.innerHTML = sanitized

      // Separate scripts from HTML content
      const scripts = Array.from(scriptContainer.querySelectorAll('script'))
      const externalScripts: HTMLScriptElement[] = []
      const inlineScripts: HTMLScriptElement[] = []

      scripts.forEach((script) => {
        if (script.src) {
          externalScripts.push(script)
        } else {
          inlineScripts.push(script)
        }
        script.remove()
      })

      // First, append the HTML content (without scripts)
      container.appendChild(scriptContainer)

      // Then load external scripts with cache busting
      externalScripts.forEach((oldScript) => {
        const newScript = document.createElement('script')

        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value)
        })

        // Track the domain for cleanup
        try {
          const url = new URL(oldScript.src)
          scriptDomains.add(url.hostname)
        } catch (e) {
          // Invalid URL, skip tracking
        }

        // Add cache-busting and force synchronous loading
        const separator = oldScript.src.includes('?') ? '&' : '?'
        newScript.src = `${oldScript.src}${separator}v=${Date.now()}`

        // Don't use async so the script fully executes before continuing
        newScript.async = false
        newScript.defer = false

        document.body.appendChild(newScript)
        loadedScripts.push(newScript)
      })

      // Finally, execute inline scripts
      inlineScripts.forEach((oldScript) => {
        const newScript = document.createElement('script')
        newScript.textContent = oldScript.textContent
        container.appendChild(newScript)
      })
    })

    return () => {
      // Remove any dynamically loaded scripts from tracked domains
      scriptDomains.forEach((domain) => {
        const scripts = document.querySelectorAll(`script[src*="${domain}"]`)
        scripts.forEach((script) => {
          // Only remove if it's not one we explicitly added (to avoid removing scripts from other instances)
          if (!loadedScripts.includes(script as HTMLScriptElement)) {
            script.remove()
          }
        })
      })

      // Clean up our explicitly loaded scripts
      loadedScripts.forEach((script) => {
        script.remove()
      })
      loadedScripts.length = 0
      scriptDomains.clear()

      if (container) {
        container.innerHTML = ''
      }
    }
  }, [router.asPath, embed?.scriptsForBody])

  return (
    <div className={clsx(!isGlobal && 'py-[24px]')} ref={containerRef}></div>
  )
}
