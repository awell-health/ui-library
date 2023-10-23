import React, { FC, ReactNode } from 'react'
import classes from './typingCaret.module.scss'

export const TypingCaret = () => {
  return <span data-selector="typingCarret" className={classes.caret} />
}

type WithCaretProps = {
  Component: string
  children?: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & any

export const WithTypingCaret: FC<WithCaretProps> = ({
  Component,
  children,
  ...rest
}) => {
  if (Component === 'code' && rest?.inline) {
    // The code component mistakenly receives a prop `inline: true` which
    // the DOM will complain about unless it's converted to a string.
    rest = {
      ...rest,
      inline: 'true',
    }
  }

  return (
    <Component {...rest} className="markdown-node">
      {children}
      <TypingCaret />
    </Component>
  )
}
