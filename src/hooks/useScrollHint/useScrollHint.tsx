import { useState, useEffect, useCallback } from 'react'

interface UseScrollHintHook {
  showScrollHint: boolean
}

export const useScrollHint = (fixPosition = false): UseScrollHintHook => {
  const [showScrollHint, setShowScrollHint] = useState(false)

  const determineShowScrollHint = useCallback(() => {
    if (fixPosition) {
      // For flexible layouts with fixed footer, use page-level scroll detection
      const isPageScrollable =
        document.documentElement.scrollHeight > window.innerHeight
      const isAtBottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight - 5

      setShowScrollHint(isPageScrollable && !isAtBottom)
    } else {
      // For regular layouts, use element-level scroll detection
      const mainContentEl = document.getElementById(
        'ahp_main_content_with_scroll_hint'
      )

      if (!mainContentEl) {
        setShowScrollHint(false)
        return
      }

      const isScrollable =
        mainContentEl.scrollHeight > mainContentEl.offsetHeight
      const isAtBottom =
        Math.ceil(mainContentEl.scrollTop + mainContentEl.offsetHeight) >=
        mainContentEl.scrollHeight - 5

      setShowScrollHint(isScrollable && !isAtBottom)
    }
  }, [fixPosition])

  useEffect(() => {
    // Initial check
    determineShowScrollHint()

    // Additional check after DOM updates using requestAnimationFrame
    const rafCheck = requestAnimationFrame(() => {
      determineShowScrollHint()
    })

    if (fixPosition) {
      // For flexible layouts, listen to window scroll events
      window.addEventListener('resize', determineShowScrollHint)
      window.addEventListener('scroll', determineShowScrollHint)

      // Use ResizeObserver to detect when content changes
      const resizeObserver = new ResizeObserver(() => {
        determineShowScrollHint()
      })

      // Observe the document body for size changes
      resizeObserver.observe(document.body)

      // Use MutationObserver to detect when content is added/removed
      const mutationObserver = new MutationObserver(() => {
        determineShowScrollHint()
      })

      // Observe the main content element for DOM changes
      const mainContentEl = document.getElementById(
        'ahp_main_content_with_scroll_hint'
      )
      if (mainContentEl) {
        mutationObserver.observe(mainContentEl, {
          childList: true,
          subtree: true,
          attributes: false,
        })
      }

      return () => {
        cancelAnimationFrame(rafCheck)
        window.removeEventListener('resize', determineShowScrollHint)
        window.removeEventListener('scroll', determineShowScrollHint)
        resizeObserver.disconnect()
        mutationObserver.disconnect()
      }
    } else {
      // For regular layouts, listen to element scroll events
      const mainContentEl = document.getElementById(
        'ahp_main_content_with_scroll_hint'
      )

      window.addEventListener('resize', determineShowScrollHint)
      if (mainContentEl) {
        mainContentEl.addEventListener('scroll', determineShowScrollHint)
      }

      // Use ResizeObserver to detect when the main content element changes
      const resizeObserver = new ResizeObserver(() => {
        determineShowScrollHint()
      })

      if (mainContentEl) {
        resizeObserver.observe(mainContentEl)
      }

      // Use MutationObserver to detect when content is added/removed
      const mutationObserver = new MutationObserver(() => {
        determineShowScrollHint()
      })

      if (mainContentEl) {
        mutationObserver.observe(mainContentEl, {
          childList: true,
          subtree: true,
          attributes: false,
        })
      }

      return () => {
        cancelAnimationFrame(rafCheck)
        window.removeEventListener('resize', determineShowScrollHint)
        if (mainContentEl) {
          mainContentEl.removeEventListener('scroll', determineShowScrollHint)
        }
        resizeObserver.disconnect()
        mutationObserver.disconnect()
      }
    }
  }, [fixPosition, determineShowScrollHint])

  return {
    showScrollHint,
  }
}
