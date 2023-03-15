import { useState, useEffect } from 'react'

interface UseAccentColorHook {
  accentColor: string
}

const DEFAULT_ACCENT_COLOR = '#004ac2'

export const useAccentColor = (): UseAccentColorHook => {
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR)

  useEffect(() => {
    const newAccentColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--awell-accent-color')

    if (newAccentColor) {
      setAccentColor(newAccentColor)
    }
  }, [])

  return {
    accentColor,
  }
}
