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
    onClick: { action: 'clicked' },
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

export const Button: Story<ButtonProps> = ({ variant, children, onClick }) => {
  return (
    <ButtonComponent variant={variant} onClick={onClick}>
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
