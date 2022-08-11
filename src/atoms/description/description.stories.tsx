import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  Description as DescriptionComponent,
  DescriptionProps,
} from './Description'
import { descriptionFixture } from '../../constants/descriptionFixture'
import { ThemeProvider } from '../themeProvider'

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
    <ThemeProvider accentColor="#004ac2">
      <DescriptionComponent nodes={nodes} />
    </ThemeProvider>
  )
}
