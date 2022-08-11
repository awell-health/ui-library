import * as React from 'react'
import {
  CircularSpinner as CircularSpinnerComponent,
  HorizontalSpinner as HorizontalSpinnerComponent,
} from './Spinner'
import { Story } from '@storybook/react/types-6-0'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Spinners',
  component: CircularSpinnerComponent,
}

export const CircularSpinner: Story = () => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <CircularSpinnerComponent />
    </ThemeProvider>
  )
}
export const HorizontalSpinner: Story = () => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <HorizontalSpinnerComponent />
    </ThemeProvider>
  )
}
