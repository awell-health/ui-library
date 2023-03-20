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
    content: {
      control: 'text',
      defaultValue: JSON.stringify(descriptionFixture, null, 2),
    },
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: '2em' }}>
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const Description: Story<DescriptionProps> = ({ content }) => {
  return <DescriptionComponent content={content} />
}
