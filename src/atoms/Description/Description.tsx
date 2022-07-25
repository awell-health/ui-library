import React from 'react'
import classes from './description.module.scss'
import { RichTextViewer } from '../richTextViewer'

export interface DescriptionProps {
  /**
   * nodes in slate format
   */
  nodes: Array<any>
}

export const Description = ({ nodes }: DescriptionProps): JSX.Element => {
  return (
    <div className={classes.awell_description_wrapper}>
      <RichTextViewer nodes={nodes} />
    </div>
  )
}
