import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  Description as DescriptionComponent,
  DescriptionProps,
} from './Description'
import { descriptionFixture } from '../../constants/descriptionFixture'

export default {
  title: 'atoms/Description',
  component: DescriptionComponent,
  argTypes: {
    nodes: {
      control: 'text',
      defaultValue: JSON.stringify(descriptionFixture, null, 2),
    },
  },
} as Meta

export const Description: Story<DescriptionProps> = ({ nodes }) => {
  return (
    // It's the responsibility of the consuming app to provide styling for surrounding layout
    <div style={{ maxWidth: '65ch', margin: '0 auto' }}>
      <DescriptionComponent nodes={nodes} />
    </div>
  )
}
