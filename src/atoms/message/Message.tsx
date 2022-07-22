import React, { InputHTMLAttributes } from 'react'

import classes from './rangeInput.module.scss'

export interface MessageProps extends InputHTMLAttributes<HTMLInputElement> {
  content: string
}

/* work in progress*/
export const Message = ({ content }: MessageProps): JSX.Element => {
  return <div className={classes.awell_message}>{content}</div>
}
