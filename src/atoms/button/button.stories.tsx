import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Button as ButtonComponent, ButtonProps } from './Button'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    fullWidth: {
      control: { type: 'boolean' },
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
  fullWidth,
  variant,
  children,
  onClick,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <ButtonComponent
        fullWidth={fullWidth}
        variant={variant}
        onClick={onClick}
      >
        {children}
      </ButtonComponent>
    </ThemeProvider>
  )
}

Button.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
