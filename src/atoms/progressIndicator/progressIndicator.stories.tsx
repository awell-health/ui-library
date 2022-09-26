import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  ProgressIndicator as ProgressIndicatorComponent,
  ProgressIndicatorProps,
} from '.'
import { ThemeProvider, ThemeProviderProps } from '../themeProvider'

export default {
  title: 'Atoms/Progress indicator',
  component: ProgressIndicatorComponent,
  argTypes: {
    percentageCompleted: {
      control: 'number',
      defaultValue: 50,
    },
    accentColor: {
      control: { type: 'color' },
      defaultValue: '#004ac2',
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const ProgressIndicator: Story<
  ProgressIndicatorProps & ThemeProviderProps
> = ({ percentageCompleted, accentColor }) => {
  return (
    <ThemeProvider accentColor={accentColor}>
      <ProgressIndicatorComponent percentageCompleted={percentageCompleted} />
    </ThemeProvider>
  )
}
