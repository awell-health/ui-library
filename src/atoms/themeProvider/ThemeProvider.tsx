import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getBorderRadius, getTextColor, opacityColor } from './helpers'
import classes from './themeProvider.module.scss'
import { isEmpty } from 'lodash'

type LayoutMode = 'fullViewportHeight' | 'flexible'
const defaultMode: LayoutMode = 'fullViewportHeight'
const defaultFont = 'Roboto, Inter, sans-serif'

export type Shape = 'rounded' | 'pill' | 'rectangle'

interface ThemeContextType {
  accentColor: string
  backgroundColor: string
  shape: Shape
  layoutMode: LayoutMode
  fontFamily: string
  updateLayoutMode: (mode: LayoutMode) => void
  resetLayoutMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export interface ThemeProviderProps {
  children: React.ReactNode | string
  accentColor?: string
  backgroundColor?: string
  shape?: Shape
  fontFamily?: string
  fontImportUrl?: string
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  accentColor = 'var(--awell-brand100, #004ac2)',
  backgroundColor = '#fff',
  shape = 'rounded',
  fontFamily = defaultFont,
  fontImportUrl,
}) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(defaultMode)

  useEffect(() => {
    if (!isEmpty(fontImportUrl)) {
      const link = document.createElement('link')
      link.href = fontImportUrl as string
      link.rel = 'stylesheet'
      document.head.appendChild(link)
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [fontImportUrl])

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  const style = {
    '--awell-accent-color': accentColor,
    '--awell-accent-text-color': getTextColor(accentColor),
    '--awell-accent-hover-color': opacityColor(accentColor, 0.9),
    '--awell-accent-ring-color-inputs': accentColor,
    '--awell-accent-ring-color-buttons': opacityColor(accentColor, 0.4),
    '--awell-secondary-color': opacityColor(accentColor, 0.2),
    '--awell-secondary-text-color': accentColor,
    '--awell-secondary-hover-color': opacityColor(accentColor, 0.3),
    '--awell-secondary-ring-color-inputs': accentColor,
    '--awell-secondary-ring-color-buttons': accentColor,
    '--awell-border-radius': getBorderRadius(shape),
    '--awell-checkbox-border-radius': getBorderRadius(shape, 'checkbox'),
    '--awell-modal-border-radius': getBorderRadius(shape, 'modal'),
    '--awell-progress-bar-border-radius': getBorderRadius(shape, 'progressBar'),
    '--awell-skeleton-border-radius': getBorderRadius(shape, 'skeleton'),
    '--awell-font': isEmpty(fontFamily) ? defaultFont : fontFamily,
    height: '100%',
  } as React.CSSProperties

  const updateLayoutMode = (mode: LayoutMode) => {
    setLayoutMode(mode)
  }

  const resetLayoutMode = () => {
    setLayoutMode(defaultMode)
  }

  const contextValue = {
    accentColor,
    backgroundColor,
    shape,
    layoutMode,
    fontFamily,
    updateLayoutMode,
    resetLayoutMode,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={classes.awell_themeProvider} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
