import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  Description as DescriptionComponent,
  DescriptionProps,
} from './Description'

const defaultNodes = [
  { type: 'p', children: [{ text: 'italic', italic: true }] },
  { type: 'p', children: [{ text: 'underline', underline: true }] },
  {
    type: 'p',
    children: [{ text: 'strike through', strikethrough: true }],
  },
]

export default {
  title: 'atoms/Description',
  component: DescriptionComponent,
  argTypes: {
    nodes: {
      control: 'text',
      defaultValue: JSON.stringify(defaultNodes, null, 2),
    },
  },
} as Meta

export const Description: Story<DescriptionProps> = ({ nodes }) => {
  return <DescriptionComponent nodes={nodes} />
}
