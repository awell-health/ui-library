import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Stepper as StepperComponent, StepperProps } from './Stepper'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/Stepper',
  component: StepperComponent,
  argTypes: {
    steps: {
      control: 'array',
      defaultValue: [
        { id: 'Step 1', name: 'Job details', href: '#', status: 'complete' },
        {
          id: 'Step 2',
          name: 'Application form',
          href: '#',
          status: 'current',
        },
        { id: 'Step 3', name: 'Preview', href: '#', status: 'upcoming' },
      ],
    },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Stepper: Story<StepperProps> = ({ steps }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <StepperComponent steps={steps} />
    </div>
  )
}
