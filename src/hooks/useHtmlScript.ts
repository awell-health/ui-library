import { useEffect, useState } from 'react'

type UseScript = (url: string) => { isLoaded: boolean }

/**
 * Loads HTML script asynchronously with hook and dynamically add/remove it to/from DOM, instead of putting it manually inside <script> tag in HTML
 */
export const useHtmlScript: UseScript = (url: string) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')

    script.onload = () => {
      setIsLoaded(true)
    }
    script.src = url
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      setIsLoaded(false)
    }
  }, [url])

  return { isLoaded }
}
