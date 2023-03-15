import React from 'react'
import classes from './description.module.scss'
import { RichTextViewer } from '../richTextViewer'
import { Nodes } from '../../types'
import { generatePureHtml } from '../richTextViewer/serializeHtml'

export interface DescriptionProps {
  /**
   * nodes in slate format or html string
   */
  content: Nodes | string
}

export const Description = ({ content }: DescriptionProps): JSX.Element => {
  const cleanContent = generatePureHtml(content)

  return (
    <div className={`${classes.awell_description_wrapper} ${classes.content}`}>
      <RichTextViewer content={cleanContent} />
    </div>
  )
}
