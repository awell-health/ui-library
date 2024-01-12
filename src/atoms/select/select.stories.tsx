import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useEffect, useState } from 'react'
import { Select as SelectComponent, SelectProps } from './Select'
import { ThemeProvider } from '../../atoms'
import { type Option } from './types'
import { debounce, isNil } from 'lodash'

export default {
  title: 'Atoms/Select',
  component: SelectComponent,
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    optionsShown: {
      control: 'number',
      defaultValue: 4,
    },
    labels: {
      control: 'object',
      defaultValue: {
        questionLabel: 'Name',
        placeholder: 'Type to search',
        noOptions: 'No options',
        loading: 'I am loading...',
      },
    },
    mandatory: {
      control: 'boolean',
      defaultValue: true,
    },
    showCount: {
      control: 'boolean',
      defaultValue: true,
    },
    displayMaxLength: {
      control: 'number',
      defaultValue: 15,
    },
    onChange: { action: 'change' },
    options: {
      control: 'array',
      defaultValue: [
        { label: 'No known allergies', value: 0 },
        { label: 'Taking prescription medication', value: 1 },
        { label: 'History of heart disease', value: 2 },
        { label: 'Regular exercise routine', value: 3 },
        { label: 'Following a balanced diet', value: 4 },
        { label: 'Experiencing chronic pain', value: 5 },
      ],
    },
    filtering: {
      control: 'boolean',
      defaultValue: true,
    },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <div
          style={{
            padding: '1em',
            width: 400,
          }}
        >
          <StoryComponent />
        </div>
      </ThemeProvider>
    ),
  ],
} as Meta

export const SingleSelect: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  options,
  optionsShown,
  labels,
  filtering,
}) => {
  const [value, setValue] = React.useState<number>()
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }

  return (
    <SelectComponent
      type="single"
      labels={labels}
      onChange={handleChange}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
      filtering={filtering}
    />
  )
}

SingleSelect.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const SingleSelectManyOptions: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  optionsShown,
  labels,
  filtering,
}) => {
  const [value, setValue] = React.useState<number>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const optionsMany = Array.from(Array(10000).keys()).map((i) => ({
    id: i.toString(),
    label: `Option ${i}`,
    value: i,
  }))

  return (
    <SelectComponent
      type="single"
      labels={labels}
      onChange={handleChange}
      id={id}
      loading={loading}
      mandatory={mandatory}
      options={optionsMany}
      optionsShown={optionsShown}
      value={value}
      filtering={filtering}
    />
  )
}

SingleSelectManyOptions.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const SingleSelectRemoteOptions: Story<SelectProps> = ({
  id,
  labels,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option>()
  const [options, setOptions] = useState<Array<Option>>([])
  const [error, setError] = useState<unknown>()
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const url = 'https://uniformly-wealthy-python.ngrok-free.app/api/data'
  const queryParam = 'search'
  const headers = '{}'

  const handleChange = (value: number | Option[]) => {
    const selectedOption = options.find(
      (option) => option.value.toString() === value.toString()
    )
    setSelectedOption(selectedOption)
  }

  const generateUrl = (url: string, queryParam: string, search = '') => {
    return !isNil(queryParam) && search !== ''
      ? `${url}?${queryParam}=${search}`
      : url
  }

  const handleFetchOptions = async (
    url: string,
    queryParam: string,
    headers: string,
    search = '',
    onError?: (error: unknown) => void
  ) => {
    try {
      setLoading(true)
      const response = await fetch(generateUrl(url, queryParam, search), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'yes',
          ...JSON.parse(headers),
        },
      })
      const options = await response.json()
      return options
    } catch (error) {
      if (!isNil(onError)) {
        onError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchOptionsDebounced = debounce(async () => {
    const options = await handleFetchOptions(
      url,
      queryParam,
      headers,
      searchText,
      setError
    )
    setOptions(options)
  }, 500)

  useEffect(() => {
    fetchOptionsDebounced()
  }, [searchText])

  if (!options) {
    return <></>
  }

  return (
    <SelectComponent
      id={id}
      type="single"
      labels={labels}
      onChange={handleChange}
      loading={loading}
      mandatory
      options={options}
      value={selectedOption?.value ?? ''}
      filtering
      onSearch={(value: string) => {
        setSearchText(value)
      }}
    />
  )
}

SingleSelectRemoteOptions.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const SingleSelectPrefilled: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  options,
  optionsShown,
  labels,
  filtering,
}) => {
  const [value, setValue] = React.useState<number>(options[0].value)
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }

  return (
    <SelectComponent
      type="single"
      labels={labels}
      onChange={handleChange}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
      filtering={filtering}
    />
  )
}

SingleSelectPrefilled.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const MultipleSelect: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  options,
  optionsShown,
  labels,
  showCount,
  displayMaxLength,
  filtering,
}) => {
  const [value, setValue] = React.useState<Array<Option>>()
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as Array<Option>)
    onChange(value)
  }

  return (
    <SelectComponent
      type="multiple"
      labels={labels}
      onChange={handleChange}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
      showCount={showCount}
      displayMaxLength={displayMaxLength}
      filtering={filtering}
    />
  )
}

MultipleSelect.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const MultipleSelectPrefilled: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  options,
  optionsShown,
  labels,
  showCount,
  displayMaxLength,
  filtering,
}) => {
  const [value, setValue] = React.useState<Array<Option>>([
    options[0],
    options[1],
    options[5],
  ])
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as Array<Option>)
    onChange(value)
  }

  return (
    <SelectComponent
      type="multiple"
      labels={labels}
      onChange={handleChange}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
      showCount={showCount}
      displayMaxLength={displayMaxLength}
      filtering={filtering}
    />
  )
}

MultipleSelectPrefilled.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const SingleSelectNoFiltering: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  options,
  optionsShown,
  labels,
  showCount,
  displayMaxLength,
}) => {
  const [value, setValue] = React.useState<number>()
  const [valueFilled, setValueFilled] = React.useState<number>(1)
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }
  const handleFilledChange = (value: Array<Option> | number) => {
    setValueFilled(value as number)
    onChange(value)
  }

  return (
    <>
      <SelectComponent
        type="single"
        labels={labels}
        onChange={handleChange}
        id={id}
        mandatory={mandatory}
        options={options}
        optionsShown={optionsShown}
        value={value}
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
      <br />
      <SelectComponent
        type="single"
        labels={labels}
        onChange={handleFilledChange}
        id={id}
        mandatory={mandatory}
        options={options}
        optionsShown={optionsShown}
        value={valueFilled}
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
    </>
  )
}

SingleSelectNoFiltering.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
export const MultipleSelectNoFiltering: Story<SelectProps> = ({
  id,
  onChange,
  mandatory,
  options,
  optionsShown,
  labels,
  showCount,
  displayMaxLength,
}) => {
  const [value, setValue] = React.useState<Array<Option>>()
  const [valueFilled, setValueFilled] = React.useState<Array<Option>>([
    options[0],
    options[1],
    options[5],
  ])
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as Array<Option>)
    onChange(value)
  }
  const handleFilledChange = (value: Array<Option> | number) => {
    setValueFilled(value as Array<Option>)
    onChange(value)
  }

  return (
    <>
      <SelectComponent
        type="multiple"
        labels={labels}
        onChange={handleChange}
        id={id}
        mandatory={mandatory}
        options={options}
        optionsShown={optionsShown}
        value={value}
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
      <br />
      <SelectComponent
        type="multiple"
        labels={labels}
        onChange={handleFilledChange}
        id={id}
        mandatory={mandatory}
        options={options}
        optionsShown={optionsShown}
        value={valueFilled}
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
    </>
  )
}

MultipleSelectNoFiltering.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
