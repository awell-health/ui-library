import {
  FileList,
  type FileListItem,
  FileUpload,
} from '@awell-health/design-system'
import React, { useEffect, useState } from 'react'
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
  fileUploadErrors?: Array<{ id: string; error: string }>
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
  fileUploadErrors,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<FileListItem>>([])

  useEffect(() => {
    if (fileUploadErrors && fileUploadErrors.length > 0) {
      console.log('fileUploadErrors', fileUploadErrors)
      setSelectedFiles((prev) =>
        prev.map((file) => {
          const fileId = file.name
          const error = fileUploadErrors.find((f) => f.id === fileId)
          if (error) {
            return { ...file, error: error.error }
          }
          return file
        })
      )
    }
  }, [fileUploadErrors])

  const handleFileChange = (files: FileList): void => {
    const updatedFiles = files as unknown as Array<File>
    const filesAsListItems = updatedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })) as unknown as Array<FileListItem>

    // We save the files as list items for visual feedback (i.e. error messages)
    setSelectedFiles((prev) => [...prev, ...filesAsListItems])
    // We send the files as files for the onChange callback (includes the file binary data)
    onChange([...selectedFiles, ...updatedFiles] as unknown as Array<File>)
  }

  const handleRemoveFile = (file: FileListItem): void => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== file.name))
    onChange(
      selectedFiles.filter(
        (f) => f.name !== file.name
      ) as unknown as Array<File>
    )
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
          error={error}
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
