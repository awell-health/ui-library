import { useState, useEffect } from 'react'

interface UseScrollHintHook {
  showScrollHint: boolean
  determineShowScrollHint: () => void
}

export const useScrollHint = (): UseScrollHintHook => {
  const [showScrollHint, setShowScrollHint] = useState(false)

  const determineShowScrollHint = () => {
    const viewportHeight = window.innerHeight
    const documentHeight = window.document.body.offsetHeight

    const isDocumentHeightHigherThanViewportHeight =
      documentHeight > viewportHeight
    const hasUserScrolledToBottomOfDocument =
      Math.ceil(viewportHeight + window.scrollY) >=
      document.documentElement.scrollHeight

    if (
      isDocumentHeightHigherThanViewportHeight &&
      !hasUserScrolledToBottomOfDocument
    ) {
      setShowScrollHint(true)
    } else {
      setShowScrollHint(false)
    }
  }

  useEffect(() => {
    determineShowScrollHint()
  }, [window.document.body.offsetHeight])

  useEffect(() => {
    determineShowScrollHint()

    window.addEventListener('resize', determineShowScrollHint)
    window.addEventListener('scroll', determineShowScrollHint)
    return () => {
      window.removeEventListener('resize', determineShowScrollHint)
      window.removeEventListener('scroll', determineShowScrollHint)
    }
  }, [])

  return {
    showScrollHint,
    determineShowScrollHint,
  }
}
