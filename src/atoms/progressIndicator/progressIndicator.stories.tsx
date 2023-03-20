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
    showPercentage: {
      control: 'boolean',
      defaultValue: true,
    },
  },
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

export const ProgressIndicator: Story<
  ProgressIndicatorProps & ThemeProviderProps
> = ({ percentageCompleted, showPercentage }) => {
  return (
    <ProgressIndicatorComponent
      percentageCompleted={percentageCompleted}
      showPercentage={showPercentage}
    />
  )
}
