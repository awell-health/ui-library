import {
  FileList,
  type FileListItem,
  FileUpload,
} from '@awell-health/design-system'
import React, { useState } from 'react'
import classes from './FileInputField.module.scss'

interface Props {
  id?: string
  label?: string
  description?: string
  accept?: Array<string> // MIME types, e.g., "image/*,.pdf"
  maxSize?: number // in bytes
  multiple?: boolean
  error?: string
  disabled?: boolean
  required?: boolean
  onChange: (files: Array<File>) => void
  onError?: (error: string) => void
  className?: string
  onBlur?: () => void
  dataCy?: string
  value?: Array<string>
  loading?: boolean
}

export const FileInputField: React.FC<Props> = ({
  id,
  label,
  description,
  accept,
  maxSize,
  multiple = false,
  error,
  disabled = false,
  required = false,
  onChange,
  onError,
  className = '',
  dataCy,
  value,
  loading = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

  const handleFileChange = (files: FileList): void => {
    const updatedFiles = files as unknown as Array<File>

    setSelectedFiles((prev) => [...prev, ...updatedFiles])
    onChange([...selectedFiles, ...updatedFiles])
  }

  const handleRemoveFile = (file: FileListItem): void => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== file.name))
    onChange(selectedFiles.filter((f) => f.name !== file.name))
  }

  return (
    <div className={className} data-cy={dataCy}>
      <div className={classes.file_input_field_container}>
        {error && <div className={classes.error_message}>{error}</div>}

        <FileUpload
          onChange={handleFileChange}
          onError={onError}
          isMultiple={multiple}
          accept={accept}
          label={label}
        />

        {selectedFiles.length > 0 && (
          <div className={classes.file_list}>
            <FileList files={selectedFiles} onDelete={handleRemoveFile} />
          </div>
        )}
      </div>
    </div>
  )
}
