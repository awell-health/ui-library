import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Stepper as StepperComponent, StepperProps } from './Stepper'
import { ThemeProvider } from '..'

export default {
  title: 'Atoms/Stepper',
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
    onStepClick: { action: 'clicked' },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Stepper: Story<StepperProps> = ({
  steps: initialSteps,
  onStepClick,
}) => {
  const [steps, setSteps] = useState(initialSteps)

  const updateStepStatus = (stepId: string) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return { ...step, status: 'current' }
      } else if (
        steps.findIndex((s) => s.id === step.id) <
        steps.findIndex((s) => s.id === stepId)
      ) {
        return { ...step, status: 'complete' }
      } else {
        return { ...step, status: 'upcoming' }
      }
    }) as typeof steps

    setSteps(updatedSteps)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <StepperComponent
        steps={steps}
        onStepClick={(stepId) => {
          onStepClick(stepId)
          updateStepStatus(stepId)
        }}
      />
    </div>
  )
}
