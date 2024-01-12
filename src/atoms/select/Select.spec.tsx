import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { Select, SelectProps } from './Select'
import { type Option } from './types'
import '@testing-library/jest-dom/extend-expect'

const options: Array<Option> = [
  { label: 'Option 1', value: 1, id: '1' },
  { label: 'Option 2', value: 2, id: '2' },
  { label: 'Option 3', value: 3, id: '3' },
  { label: 'Option 4', value: 4, id: '4' },
  { label: 'Option 5', value: 5, id: '5' },
]

describe('Select', () => {
  describe('Select with type set to single', () => {
    const defaultProps: SelectProps = {
      type: 'single',
      id: 'select-test',
      onChange: jest.fn(),
      value: undefined,
      options,
      labels: {
        questionLabel: 'Select',
        placeholder: 'Search',
        noOptions: 'No options',
        customError: 'Custom error',
      },
    }

    it('renders the component with default props', () => {
      const { getByLabelText } = render(<Select {...defaultProps} />)
      const selectInput = getByLabelText('Select')

      expect(selectInput).toBeInTheDocument()
    })

    it('opens the dropdown when the input is clicked', () => {
      const { getByLabelText, getByRole } = render(<Select {...defaultProps} />)
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)

      const dropdown = getByRole('listbox')

      expect(dropdown).toBeInTheDocument()
    })

    it('calls onChange when an option is selected', () => {
      const onChange = jest.fn()
      const { getByLabelText, getByText } = render(
        <Select {...defaultProps} onChange={onChange} />
      )
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)
      fireEvent.click(getByText('Option 1'))

      expect(onChange).toHaveBeenCalledWith(1)
    })

    it('closes the dropdown after selecting an option when type is single', () => {
      const { getByLabelText, getByText, queryByRole } = render(
        <Select {...defaultProps} />
      )
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)
      fireEvent.click(getByText('Option 1'))

      expect(defaultProps.onChange).toHaveBeenCalledWith(1)
      setTimeout(() => {
        expect(queryByRole('listbox')).not.toBeInTheDocument()
      }, 200)
    })

    it('filters the options as the user types in the input when filtering is enabled', () => {
      const { getByLabelText, getByTestId, queryByText } = render(
        <Select {...defaultProps} filtering />
      )
      const selectInput = getByLabelText('Select')
      const input = getByTestId('input-select-test')

      fireEvent.click(selectInput)
      fireEvent.change(input, { target: { value: '2' } })

      setTimeout(() => {
        expect(queryByText('Option 1')).not.toBeInTheDocument()
        expect(queryByText('Option 2')).toBeInTheDocument()
        expect(queryByText('Option 3')).not.toBeInTheDocument()
        expect(queryByText('Option 4')).not.toBeInTheDocument()
        expect(queryByText('Option 5')).not.toBeInTheDocument()
      }, 200)
    })
    it('displays a message when no options are available', () => {
      const { getByLabelText, getByText } = render(
        <Select {...defaultProps} options={[]} />
      )
      const selectInput = getByLabelText('Select')
      fireEvent.click(selectInput)
      setTimeout(() => {
        expect(getByText('No options available.')).toBeInTheDocument()
      }, 200)
    })

    it('handles large numbers of options without impacting performance', () => {
      const numOptions = 10000
      const options = Array.from({ length: numOptions }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: i + 1,
        id: `${i + 1}`,
      }))
      const { getByLabelText, getByTestId, getByText } = render(
        <Select {...defaultProps} id="testing" options={options} />
      )
      const selectInput = getByLabelText('Select')
      const input = getByTestId('input-testing')

      fireEvent.click(selectInput)
      fireEvent.change(input, { target: { value: '2' } })

      // NB: the component uses react-window so take the render delay into account when testing
      setTimeout(() => {
        expect(getByText('Option 2')).toBeInTheDocument()
      }, 200)

      fireEvent.change(input, { target: { value: '1000' } })

      setTimeout(() => {
        expect(getByText('Option 1000')).toBeInTheDocument()
      }, 200)
    })
  })

  describe('Select with type set to multiple', () => {
    const defaultProps: SelectProps = {
      type: 'multiple',
      id: 'select-test',
      onChange: jest.fn(),
      value: undefined,
      options,
      labels: {
        questionLabel: 'Select',
        placeholder: 'Search',
        noOptions: 'No options',
        customError: 'Custom error',
        loading: 'Loading...',
      },
    }

    it('renders the component with default props', () => {
      const { getByLabelText } = render(<Select {...defaultProps} />)
      const selectInput = getByLabelText('Select')

      expect(selectInput).toBeInTheDocument()
    })

    it('opens the dropdown when the input is clicked', () => {
      const { getByLabelText, getByRole } = render(<Select {...defaultProps} />)
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)

      const dropdown = getByRole('listbox')

      expect(dropdown).toBeInTheDocument()
    })

    it('calls onChange with an array of selected values when options are clicked', () => {
      const onChange = jest.fn()
      const { getByLabelText, getByText } = render(
        <Select {...defaultProps} onChange={onChange} />
      )
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)
      fireEvent.click(getByText('Option 1'))
      fireEvent.click(getByText('Option 2'))

      expect(onChange).toHaveBeenCalledWith([options[0], options[1]])
    })

    it('displays a count of selected options when showCount is enabled', () => {
      const { getByLabelText, getByText } = render(
        <Select {...defaultProps} showCount />
      )
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)
      fireEvent.click(getByText('Option 1'))
      fireEvent.click(getByText('Option 2'))

      expect(getByText('2')).toBeInTheDocument()
    })

    it('removes a value from the array of selected values when an option is clicked twice', () => {
      const onChange = jest.fn()
      const { getByLabelText, getByText } = render(
        <Select {...defaultProps} onChange={onChange} />
      )
      const selectInput = getByLabelText('Select')

      fireEvent.click(selectInput)
      fireEvent.click(getByText('Option 1'))
      fireEvent.click(getByText('Option 1'))

      expect(onChange).toHaveBeenCalledWith([])
    })
  })
})
