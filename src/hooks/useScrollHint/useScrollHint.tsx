import { useState, useEffect } from 'react'

interface UseScrollHintHook {
  showScrollHint: boolean
  determineShowScrollHint: () => void
}

export const useScrollHint = (): UseScrollHintHook => {
  const [showScrollHint, setShowScrollHint] = useState(false)

  const determineShowScrollHint = () => {
    const mainContentEl = document.getElementById(
      'ahp_main_content_with_scroll_hint'
    )

    if (mainContentEl) {
      const isElementTotalHeightHigherThanElementVisibleHeight =
        mainContentEl.scrollHeight > mainContentEl.offsetHeight

      const hasUserScrolledToBottomOfEl =
        Math.ceil(mainContentEl.scrollTop + mainContentEl.offsetHeight) >=
        mainContentEl.scrollHeight - 5 // 5 is a buffer to account for rounding errors

      if (
        isElementTotalHeightHigherThanElementVisibleHeight &&
        !hasUserScrolledToBottomOfEl
      ) {
        setShowScrollHint(true)
      } else {
        setShowScrollHint(false)
      }
    } else {
      setShowScrollHint(false)
    }
  }

  useEffect(() => {
    determineShowScrollHint()
  }, [window.document.body.offsetHeight])

  useEffect(() => {
    determineShowScrollHint()

    const mainContentEl = document.getElementById(
      'ahp_main_content_with_scroll_hint'
    )

    window.addEventListener('resize', determineShowScrollHint)
    if (mainContentEl) {
      mainContentEl.addEventListener('scroll', determineShowScrollHint)
    }
    return () => {
      window.removeEventListener('resize', determineShowScrollHint)
      if (mainContentEl) {
        mainContentEl.removeEventListener('scroll', determineShowScrollHint)
      }
    }
  }, [])

  return {
    showScrollHint,
    determineShowScrollHint,
  }
}
