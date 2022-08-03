import React, { FC, ReactElement, ReactNode, CSSProperties } from 'react'
import { TextVariants } from './types'
import classes from './typography.module.scss'

export interface TypographyProps {
  children: string | string[] | JSX.Element | ReactNode
  /* sets style of the typography element
  *  Variants are compatible with all typography components
     You can try out different typography variants by selecting one from controls panel
  * */
  variant?: TextVariants
  /* sets custom color */
  color?: string
  /* sets custom spacing, should be passed in order "top" "right" "bottom" "left" */
  spacing?: string
  classes?: CSSProperties | string
}

export const HeadingMain: FC<TypographyProps> = ({
  variant = 'hugeHeadline',
  color,
  spacing,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties

  return (
    <h1 style={style} className={classes[variant]}>
      {children}
    </h1>
  )
}
HeadingMain.displayName = 'HeadingMain'

export const HeadingSecondary: FC<TypographyProps> = ({
  variant = 'bigHeadline',
  color,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties
  return (
    <h2 style={style} className={classes[variant]}>
      {children}
    </h2>
  )
}
HeadingSecondary.displayName = 'HeadingSecondary'

export const HeadingTertiary: FC<TypographyProps> = ({
  variant = 'headline',
  color,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties
  return (
    <h3 style={style} className={classes[variant]}>
      {children}
    </h3>
  )
}
HeadingTertiary.displayName = 'HeadingTertiary'

export const SubHeading: FC<TypographyProps> = ({
  variant = 'subHeadline',
  color,
  spacing,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties
  return (
    <h4 style={style} className={classes[variant]}>
      {children}
    </h4>
  )
}
SubHeading.displayName = 'SubHeading'

export const Heading5: FC<TypographyProps> = ({
  variant = 'smallHeadline',
  color,
  spacing,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties
  return (
    <h5 style={style} className={classes[variant]}>
      {children}
    </h5>
  )
}
Heading5.displayName = 'Heading5'

export const Heading6: FC<TypographyProps> = ({
  variant = 'tinyHeadline',
  color,
  spacing,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties
  return (
    <h6 style={style} className={classes[variant]}>
      {children}
    </h6>
  )
}
Heading6.displayName = 'Heading6'

export const Text: FC<TypographyProps> = ({
  variant = 'textRegular',
  color,
  spacing,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties

  return (
    <p style={style} className={classes[variant]}>
      {children}
    </p>
  )
}
Text.displayName = 'Text'

export const InlineText: FC<TypographyProps> = ({
  variant = 'textRegular',
  color,
  spacing,
  children,
}) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties

  return (
    <span style={style} className={classes[variant]}>
      {children}
    </span>
  )
}
InlineText.displayName = 'InlineText'

export const ExternalLink: FC<
  TypographyProps & { href: string; rel: string }
> = ({ color, href, rel, children, ...props }) => {
  const style = { '--awell-typography-color': color } as React.CSSProperties

  return (
    <a style={style} className={classes.link} href={href} rel={rel}>
      {children}
    </a>
  )
}
ExternalLink.displayName = 'ExternalLink'

export const InnerText: FC<TypographyProps> = ({
  variant = 'textRegular',
  color,
  spacing,
  children,
}): ReactElement => {
  const style = { '--awell-typography-color': color } as React.CSSProperties

  return (
    <span style={style} className={classes[variant]}>
      {children}
    </span>
  )
}
InnerText.displayName = 'InnerText'
