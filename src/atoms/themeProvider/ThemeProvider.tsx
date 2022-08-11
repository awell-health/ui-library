import React, { FC } from 'react'
import classes from './themeProvider.module.scss'
import { getTextColor, shadeColor } from './helpers'

export interface ThemeProviderProps {
  children: React.ReactNode | string
  accentColor: string
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  accentColor = 'var(--awell-brand100)',
}) => {
  const style = {
    '--awell-accent-color': accentColor,
    '--awell-text-on-accent-color': getTextColor(accentColor),
    '--awell-accent-color--light': shadeColor(accentColor, 15),
    '--awell-accent-color--lighter': shadeColor(accentColor, 30),
    '--awell-accent-color--darker': shadeColor(accentColor, -15),
  } as React.CSSProperties
  return (
    <div className={classes.awell_theme} style={style}>
      {children}
    </div>
  )
}

ThemeProvider.displayName = 'Button'
