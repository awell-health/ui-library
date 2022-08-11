import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  ThemeProvider as ThemeProviderComponent,
  ThemeProviderProps,
} from './ThemeProvider'
import { CircularSpinner, HorizontalSpinner } from '../spinner'
import { RadioButton } from '../radioButton'
import { Button } from '../button'
import { CheckboxButton } from '../checkboxButton'
import { RangeInput } from '../rangeInput'

const getComponentForSelected = (type: string) => {
  switch (type) {
    case 'horizontalSpinner':
      return <HorizontalSpinner />
    case 'circularSpinner':
      return <CircularSpinner />
    case 'radioButton':
      return (
        <RadioButton
          onChange={() => null}
          label="Radio button label"
          id={'btn'}
        />
      )
    case 'checkboxButton':
      return (
        <CheckboxButton
          label="Checkbox button label"
          id={'id'}
          onChange={() => null}
        />
      )
    case 'button':
      return (
        <Button id={'id'} onClick={() => null}>
          Label
        </Button>
      )
    case 'rangeInput':
      return (
        <RangeInput
          sliderConfig={{
            min: 0,
            max: 100,
            step_value: 1,
            display_marks: false,
            min_label: 'small',
            max_label: 'big',
            is_value_tooltip_on: false,
            show_min_max_values: false,
          }}
          onChange={() => null}
          id="range"
        />
      )
    default:
      return (
        <Button id={'id'} onClick={() => null}>
          Label
        </Button>
      )
  }
}
export default {
  title: 'Atoms/Theme Provider',
  component: ThemeProviderComponent,
  argTypes: {
    accentColor: {
      control: { type: 'color' },
      defaultValue: '#5368d7',
    },
    componentPreview: {
      control: { type: 'radio' },
      options: [
        'horizontalSpinner',
        'circularSpinner',
        'radioButton',
        'checkboxButton',
        'rangeInput',
        'button',
      ],
      defaultValue: 'button',
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

export const ThemeProvider: Story<
  ThemeProviderProps & { componentPreview: string }
> = ({ componentPreview, accentColor }) => {
  return (
    <ThemeProviderComponent accentColor={accentColor}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <div
          style={{
            background: 'var(--awell-accent-color)',
            width: '40px',
            height: '40px',
            marginRight: '8px',
          }}
        />
        Accent color
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <div
          style={{
            background: 'var(--awell-accent-color--light)',
            width: '40px',
            height: '40px',
            marginRight: '8px',
          }}
        />
        Accent color light
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <div
          style={{
            background: 'var(--awell-accent-color--lighter)',
            width: '40px',
            height: '40px',
            marginRight: '8px',
          }}
        />
        Accent color lighter
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <div
          style={{
            background: 'var(--awell-accent-color--darker)',
            width: '40px',
            height: '40px',
            marginRight: '8px',
          }}
        />
        Accent color darker
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
          marginTop: '30px',
        }}
      >
        <div
          style={{
            background: 'var(--awell-accent-color)',
            color: 'var(--awell-text-on-accent-color)',
            padding: '20px',
            marginRight: '8px',
            borderRadius: '4px',
          }}
        >
          Text on accent color
        </div>
      </div>

      <div>
        <h5>Preview components</h5>
      </div>

      {getComponentForSelected(componentPreview)}
    </ThemeProviderComponent>
  )
}

ThemeProvider.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
