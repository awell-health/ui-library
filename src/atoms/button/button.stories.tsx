import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Button as ButtonComponent, ButtonProps } from './Button'

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'text', 'tertiary'],
      control: { type: 'radio' },
    },
    children: {
      control: 'text',
      defaultValue: 'Button',
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
          width: 'fit-content',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const Button: Story<ButtonProps> = ({ variant, children }) => {
  return (
    <ButtonComponent variant={variant} onClick={() => alert('Clicked!')}>
      {children}
    </ButtonComponent>
  )
}

Button.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
