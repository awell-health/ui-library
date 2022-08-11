import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Button as ButtonComponent, ButtonProps } from './Button'
import { ThemeProvider } from '../themeProvider'

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
    <ThemeProvider accentColor="#004ac2">
      <ButtonComponent variant={variant} onClick={onClick}>
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
