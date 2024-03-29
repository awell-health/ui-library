import React, { FC, createContext, useContext, useState } from 'react'
import { getTextColor, opacityColor } from './helpers'
import classes from './themeProvider.module.scss'

type LayoutMode = 'fullViewportHeight' | 'flexible'
const defaultMode: LayoutMode = 'fullViewportHeight'

interface ThemeContextType {
  accentColor: string
  layoutMode: LayoutMode
  updateLayoutMode: (mode: LayoutMode) => void
  resetLayoutMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export interface ThemeProviderProps {
  children: React.ReactNode | string
  accentColor?: string
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  accentColor = 'var(--awell-brand100, #004ac2)',
}) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(defaultMode)

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
    layoutMode,
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
