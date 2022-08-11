import React, { FC } from 'react'
import { getTextColor, shadeColor } from './helpers'

export interface ThemeProviderProps {
  children: React.ReactNode | string
  accentColor?: string
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  accentColor = 'var(--awell-brand100)',
}) => {
  const style = {
    '--awell-accent-color': accentColor,
    '--awell-accent-text-color': getTextColor(accentColor),
    '--awell-accent-hover-color': shadeColor(accentColor, -10), // 0.9
    '--awell-accent-ring-color-inputs': accentColor, // 1
    '--awell-accent-ring-color-buttons': shadeColor(accentColor, -60), // 0.4
    '--awell-secondary-color': shadeColor(accentColor, -80), // 0.2
    '--awell-secondary-text-color': accentColor, // 1
    '--awell-secondary-hover-color': shadeColor(accentColor, -70), // 0.3
    '--awell-secondary-ring-color-inputs': accentColor, // 1
    '--awell-secondary-ring-color-buttons': shadeColor(accentColor, -60), // 0.4
  } as React.CSSProperties
  return <div style={style}>{children}</div>
}
