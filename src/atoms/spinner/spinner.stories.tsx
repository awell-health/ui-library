import * as React from 'react'
import {
  CircularSpinner as CircularSpinnerComponent,
  HorizontalSpinner as HorizontalSpinnerComponent,
} from './Spinner'
import { Story } from '@storybook/react/types-6-0'

export default {
  title: 'Atoms/Spinners',
  component: CircularSpinnerComponent,
}

export const CircularSpinner: Story = () => {
  return <CircularSpinnerComponent />
}
export const HorizontalSpinner: Story = () => {
  return <HorizontalSpinnerComponent />
}
