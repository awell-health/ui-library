import {
  FileList,
  type FileListItem,
  FileUpload,
} from '@awell-health/design-system'
import React, { useState } from 'react'
import classes from './FileInputField.module.scss'
import { Attachment } from '../../molecules/question/types'
import '@awell-health/design-system/style.css'
import { QuestionLabel } from '../questionLabel'
import { isEmpty, isNil } from 'lodash'

type SingleFileListItem = FileListItem & { url?: string }

interface Props {
  id?: string
  label?: string
  accept?: Array<string> // MIME types, e.g., "image/*,.pdf"
  error?: string
  onChange: (attachment: Attachment | undefined) => void
  onError?: (error: string) => void
  className?: string
  onBlur?: () => void
  dataCy?: string
  onFileUpload?: (
    file: File,
    configSlug?: string
  ) => Promise<string | undefined>
  configSlug?: string
  value?: Attachment | null
  mandatory?: boolean
  disabled?: boolean
}

export const SingleFileInputField: React.FC<Props> = ({
  id,
  label,
  accept,
  error,
  onChange,
  onError,
  className = '',
  dataCy,
  onFileUpload,
  configSlug,
  value,
  mandatory,
  disabled,
}) => {
  const [selectedFile, setSelectedFile] = useState<
    SingleFileListItem | undefined
  >(
    !isNil(value) && !isEmpty(value)
      ? {
          id: value.filename ?? 'untitled',
          name: value.filename ?? 'untitled',
          size: value.size ?? 0,
          type: value.contentType ?? '',
          url: value.url ?? '',
          progress: 100,
          error: undefined,
        }
      : undefined
  )

  const convertErrorMessage = (error: string) => {
    if (error === 'Failed to fetch') {
      // TODO: add a translation
      return 'File upload failed. Please remove this file and try again.'
    }
    return error
  }

  const uploadFileToStorage = async (
    file: File
  ): Promise<SingleFileListItem> => {
    try {
      // Update the file status to uploading in the UI
      const uploadingFile: SingleFileListItem = {
        id: file.name,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 10, // Starting progress
        error: undefined,
      }

      // Set the file with uploading status
      setSelectedFile(uploadingFile)

      // Upload the file
      const fileUrl = await onFileUpload?.(file, configSlug)

      // Create the completed file object
      const completedFile: SingleFileListItem = {
        ...uploadingFile,
        progress: 99,
        error: undefined,
        url: fileUrl,
      }

      // Update the UI with the completed file
      setSelectedFile(completedFile)

      await new Promise((resolve) => setTimeout(resolve, 100))

      // Update progress to 100%
      const finalFile = {
        ...completedFile,
        progress: 100,
      }

      setSelectedFile(finalFile)

      // Create attachment for onChange
      if (finalFile.url) {
        const attachment: Attachment = {
          url: finalFile.url,
          filename: finalFile.name,
          contentType: finalFile.type,
          size: finalFile.size,
        }

        onChange(attachment)
      }

      return finalFile
    } catch (error) {
      const failedFile: SingleFileListItem = {
        id: file.name,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        error:
          error instanceof Error
            ? convertErrorMessage(error.message)
            : 'File upload failed',
        url: undefined,
      }

      setSelectedFile(failedFile)
      return failedFile
    }
  }

  const handleFilesChange = async (files: FileList) => {
    const file = files[0]

    if (!file) {
      onChange(undefined)
      setSelectedFile(undefined)
      return
    }

    const pendingFile: SingleFileListItem = {
      id: file.name,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 1,
      error: undefined,
    }

    setSelectedFile(pendingFile)
    await uploadFileToStorage(file)
  }

  const handleRemoveFile = () => {
    setSelectedFile(undefined)
    onChange(undefined)
  }

  // If disabled, show a read-only version of the uploaded file
  if (value && disabled === true) {
    return (
      <div
        key={id}
        className={`${classes.file_input_field_container} ${className}`}
        data-cy={dataCy}
      >
        {label && (
          <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
        )}
        {!value.url ? (
          <div>No file uploaded</div>
        ) : (
          <div className={classes.read_only_file}>
            {value.filename} ({value.contentType})
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      key={id}
      className={`${classes.file_input_field_container} ${className}`}
      data-cy={dataCy}
    >
      {label && (
        <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      )}
      {error && <div className={classes.error_message}>{error}</div>}

      <div className={classes.file_upload_wrapper}>
        <FileUpload
          onChange={handleFilesChange}
          onError={onError}
          isMultiple={false} // Always false for single file upload
          accept={accept}
          error={error}
          maxSizeMb={25}
        />
      </div>

      {selectedFile && (
        <div
          className={`${classes.file_list_wrapper} ${classes.custom_file_list_container}`}
        >
          <FileList
            files={[selectedFile]}
            onDelete={() => handleRemoveFile()}
            generalProgress={
              selectedFile.progress !== undefined && selectedFile.progress < 100
                ? selectedFile.progress
                : undefined
            }
          />
        </div>
      )}
    </div>
  )
}
