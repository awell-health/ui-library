/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RangeInput } from './RangeInput'

describe('Range input', () => {
  it('Should render the min and max label if both are present', async () => {
    const FIXTURE = {
      id: 'RANGE_INPUT_ID',
      label: 'MY_LABEL',
      sliderConfig: {
        min: 0,
        max: 100,
        step_value: 1,
        display_marks: false,
        min_label: 'small',
        max_label: 'big',
        is_value_tooltip_on: false,
        show_min_max_values: false,
      },
    }

    render(
      <RangeInput
        label={FIXTURE.label}
        id={FIXTURE.id}
        sliderConfig={FIXTURE.sliderConfig}
        onChange={() => {}}
        title="asd"
      />
    )

    const dataList = await screen.findByTestId(`${FIXTURE.id}-datalist`)

    expect(dataList).toBeVisible()

    expect(dataList).toContainHTML(
      `<option
        value='${FIXTURE.sliderConfig.min}'
        label='${FIXTURE.sliderConfig.min_label}'
      ></option>`
    )

    expect(dataList).toContainHTML(
      `<option
        value='${FIXTURE.sliderConfig.max}'
        label='${FIXTURE.sliderConfig.max_label}'
      ></option>`
    )
  })

  it('Should only render the max label if min label is undefined', async () => {
    const FIXTURE = {
      id: 'RANGE_INPUT_ID',
      label: 'MY_LABEL',
      sliderConfig: {
        min: 0,
        max: 100,
        step_value: 1,
        display_marks: false,
        min_label: undefined,
        max_label: 'big',
        is_value_tooltip_on: false,
        show_min_max_values: false,
      },
    }

    render(
      <RangeInput
        label={FIXTURE.label}
        id={FIXTURE.id}
        // @ts-expect-error checking undefined
        sliderConfig={FIXTURE.sliderConfig}
        onChange={() => {}}
        title="asd"
      />
    )

    const dataList = await screen.findByTestId(`${FIXTURE.id}-datalist`)

    expect(dataList).toBeVisible()

    expect(dataList).toContainHTML(
      `<option
        value='${FIXTURE.sliderConfig.max}'
        label='${FIXTURE.sliderConfig.max_label}'
      ></option>`
    )
  })

  it('Should work properly if both min and max labels are undefined', async () => {
    const FIXTURE = {
      id: 'RANGE_INPUT_ID',
      label: 'MY_LABEL',
      sliderConfig: {
        min: 0,
        max: 100,
        step_value: 1,
        display_marks: false,
        min_label: undefined,
        max_label: undefined,
        is_value_tooltip_on: false,
        show_min_max_values: false,
      },
    }

    render(
      <RangeInput
        label={FIXTURE.label}
        id={FIXTURE.id}
        // @ts-expect-error checking undefined
        sliderConfig={FIXTURE.sliderConfig}
        onChange={() => {}}
        title="asd"
      />
    )

    const dataList = await screen.findByTestId(`${FIXTURE.id}-datalist`)

    expect(dataList).toBeVisible()
  })
})
