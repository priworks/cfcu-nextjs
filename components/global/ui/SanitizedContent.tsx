import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

interface SanitizedContentProps {
  content: string
  allowScripts?: boolean
  allowIframes?: boolean
}

export default function SanitizedContent({
  content,
  allowScripts = false,
  allowIframes = false,
}: SanitizedContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    // Configure DOMPurify
    const config: {
      ADD_TAGS: string[]
      ADD_ATTR: string[]
    } = {
      ADD_TAGS: [],
      ADD_ATTR: [],
    }

    if (allowScripts) {
      config.ADD_TAGS.push('script')
      config.ADD_ATTR.push('src')
    }

    if (allowIframes) {
      config.ADD_TAGS.push('iframe')
      config.ADD_ATTR.push('src', 'frameborder', 'allowfullscreen')
    }

    // Sanitize the content
    const clean = DOMPurify.sanitize(content, config)
    setSanitizedContent(clean)
  }, [content, allowScripts, allowIframes])

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
}
