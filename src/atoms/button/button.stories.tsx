import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Button as ButtonComponent, ButtonProps } from './Button'

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    size: {
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      control: { type: 'radio' },
      defaultValue: 'base',
    },
    fullWidth: {
      options: [true, false],
      control: { type: 'radio' },
      defaultValue: false,
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
      defaultValue: 'primary',
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
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const Button: Story<ButtonProps> = ({
  size,
  fullWidth,
  variant,
  children,
  onClick,
}) => {
  return (
    <ButtonComponent
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      onClick={onClick}
    >
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
