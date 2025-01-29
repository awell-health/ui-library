import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Option } from '../../types'
import { debounce } from 'lodash'

const ICD_10_CLASSIFICATION_ENDPOINT = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search`

export const useICDClassificationList = () => {
  const [options, setOptions] = useState<Array<Option>>(() => {
    const savedOptions = localStorage.getItem('icdOptions')
    return savedOptions ? JSON.parse(savedOptions) : []
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const fetchICDCodes = async (terms: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(ICD_10_CLASSIFICATION_ENDPOINT, {
        params: {
          terms,
          sf: 'code,name',
          df: 'code,name',
          maxList: 10,
        },
      })

      const [, , , displayStrings] = response.data

      const icdOptions: Array<Option> = displayStrings.map(
        ([code, name]: [string, string]) => ({
          value: `${code}|${name}`,
          label: `${code} - ${name}`,
        })
      )

      setOptions(icdOptions)
      localStorage.setItem('icdOptions', JSON.stringify(icdOptions))
    } catch (err) {
      setError('Failed to fetch ICD-10 codes')
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchICDCodesRef = useRef(
    debounce((terms: string) => {
      fetchICDCodes(terms)
    }, 600)
  )

  useEffect(() => {
    if (searchValue.length > 1) {
      debouncedFetchICDCodesRef.current(searchValue)
    } else {
      setOptions([])
    }

    return () => {
      debouncedFetchICDCodesRef.current.cancel()
    }
  }, [searchValue])

  const onIcdClassificationSearchChange = (val: string) => {
    setSearchValue(val)
    localStorage.setItem('icdSearchValue', val)
  }

  return { options, loading, error, onIcdClassificationSearchChange }
}
