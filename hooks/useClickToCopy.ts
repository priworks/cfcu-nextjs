import { useState, useCallback } from 'react'
import { copyToClipboard } from '@/utils'

export function useClickToCopy(text: string, resetDelay = 3000) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(text)
    if (success) {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), resetDelay)
    }
  }, [text, resetDelay])

  return { isCopied, handleCopy }
}
