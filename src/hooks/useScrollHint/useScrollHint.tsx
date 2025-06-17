import { useState, useEffect, useCallback, useRef } from 'react'

interface UseScrollHintHook {
  showScrollHint: boolean
}

export const useScrollHint = (): UseScrollHintHook => {
  const [showScrollHint, setShowScrollHint] = useState(false)
  const rafIdRef = useRef<number>()

  const checkScrollHint = useCallback(() => {
    // For regular layouts, use element-level scroll detection
    const mainContentEl = document.getElementById(
      'ahp_main_content_with_scroll_hint'
    )

    if (!mainContentEl) {
      setShowScrollHint(false)
      return
    }

    const isScrollable = mainContentEl.scrollHeight > mainContentEl.offsetHeight
    const isAtBottom =
      Math.ceil(mainContentEl.scrollTop + mainContentEl.offsetHeight) >=
      mainContentEl.scrollHeight - 5

    setShowScrollHint(isScrollable && !isAtBottom)
  }, [])

  // Debounced version using requestAnimationFrame
  const debouncedCheckScrollHint = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }
    rafIdRef.current = requestAnimationFrame(checkScrollHint)
  }, [checkScrollHint])

  useEffect(() => {
    // Initial check
    checkScrollHint()

    // Additional check after DOM updates using requestAnimationFrame
    const rafCheck = requestAnimationFrame(() => {
      checkScrollHint()
    })
    // For regular layouts, listen to element scroll events
    const mainContentEl = document.getElementById(
      'ahp_main_content_with_scroll_hint'
    )

    window.addEventListener('resize', checkScrollHint)
    if (mainContentEl) {
      mainContentEl.addEventListener('scroll', checkScrollHint)
    }

    // Use MutationObserver to detect when content is added/removed
    const mutationObserver = new MutationObserver(debouncedCheckScrollHint)

    if (mainContentEl) {
      mutationObserver.observe(mainContentEl, {
        childList: true,
        subtree: true,
        attributes: false,
      })
    }

    return () => {
      cancelAnimationFrame(rafCheck)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      window.removeEventListener('resize', checkScrollHint)
      if (mainContentEl) {
        mainContentEl.removeEventListener('scroll', checkScrollHint)
      }
      mutationObserver.disconnect()
    }
  }, [checkScrollHint, debouncedCheckScrollHint])

  return {
    showScrollHint,
  }
}
