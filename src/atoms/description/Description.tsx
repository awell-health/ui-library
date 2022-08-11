import React from 'react'
import classes from './description.module.scss'
import { RichTextViewer } from '../richTextViewer'
import { Nodes } from '../../types'

export interface DescriptionProps {
  /**
   * nodes in slate format
   */
  nodes: Nodes | string
}

export const Description = ({ nodes }: DescriptionProps): JSX.Element => {
  return (
    <div className={`${classes.awell_description_wrapper} ${classes.content}`}>
      <RichTextViewer nodes={nodes} format="SLATE" />
    </div>
  )
}
