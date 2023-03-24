import * as React from 'react'
import {
  CircularSpinner as CircularSpinnerComponent,
  HorizontalSpinner as HorizontalSpinnerComponent,
} from './Spinner'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Spinners',
  component: CircularSpinnerComponent,
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const CircularSpinner: Story = () => {
  return <CircularSpinnerComponent />
}
export const HorizontalSpinner: Story = () => {
  return <HorizontalSpinnerComponent />
}
