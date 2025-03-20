import {
  FileList,
  type FileListItem,
  FileUpload,
} from '@awell-health/design-system'
import React, { useEffect, useState } from 'react'
import classes from './FileInputField.module.scss'
import { Attachment } from '../../molecules/question/types'
import '@awell-health/design-system/style.css'
import { QuestionLabel } from '../questionLabel'

interface Props {
  id?: string
  label?: string
  accept?: Array<string> // MIME types, e.g., "image/*,.pdf"
  multiple?: boolean
  error?: string
  onChange: (attachments: Array<Attachment>) => void
  onError?: (error: string) => void
  className?: string
  onBlur?: () => void
  dataCy?: string
  onFileUpload?: (
    file: File,
    configSlug?: string
  ) => Promise<string | undefined>
  configSlug?: string
  value?: Array<Attachment>
  mandatory?: boolean
}

export const FileInputField: React.FC<Props> = ({
  id,
  label,
  accept,
  multiple = true,
  error,
  onChange,
  onError,
  className = '',
  dataCy,
  onFileUpload,
  configSlug,
  value,
  mandatory,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<
    Array<FileListItem & { url?: string }>
  >(
    // initialize state from provided value prop. The value is saved as Attachment[], so need to convert to FileListItem[]
    Array.isArray(value)
      ? (value?.map((attachment) => ({
          name: attachment.filename ?? '',
          size: attachment.size ?? 0,
          type: attachment.contentType ?? '',
          url: attachment.url ?? '',
          progress: 100,
          error: undefined,
        })) as Array<FileListItem & { url?: string }>)
      : []
  )

  useEffect(() => {
    const attachments = selectedFiles
      .filter((file) => file.url)
      .map((file) => ({
        url: file.url,
        filename: file.name,
        contentType: file.type,
        size: file.size,
      }))

    onChange(attachments)
  }, [selectedFiles])

  const convertErrorMessage = (error: string) => {
    if (error === 'Failed to fetch') {
      // TODO: add a translation
      return 'File upload failed. Please remove this file and try again.'
    }
    return error
  }

  const uploadFilesToStorage = async (files: FileList) => {
    const fileListWithUrls: Array<FileListItem & { url?: string }> = []

    // Process files one by one
    for (const file of Array.from(files)) {
      try {
        // Update the file status to uploading in the UI
        const uploadingFile = {
          id: file.name,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 10, // Starting progress
          error: undefined,
        }

        // Add the file with uploading status
        setSelectedFiles((prev) => [
          ...prev.filter((f) => f.id !== file.name),
          uploadingFile,
        ])

        // Upload the file
        const fileUrl = await onFileUpload?.(file, configSlug)

        // Create the completed file object
        const completedFile = {
          id: file.name,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 99,
          error: undefined,
          url: fileUrl,
        }

        // Update the UI with the completed file
        setSelectedFiles((prev) => [
          ...prev.filter((f) => f.id !== file.name),
          completedFile,
        ])

        await new Promise((resolve) => setTimeout(resolve, 100))

        // Update the UI with the completed file
        setSelectedFiles((prev) => [
          ...prev.filter((f) => f.id !== file.name),
          {
            ...completedFile,
            progress: 100,
          },
        ])

        // Add to our result array
        fileListWithUrls.push(completedFile)
      } catch (error) {
        const failedFile = {
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

        // Update the UI with the failed file
        setSelectedFiles((prev) => [
          ...prev.filter((f) => f.id !== file.name),
          failedFile,
        ])

        // Add to our result array
        fileListWithUrls.push(failedFile)
      }
    }

    return fileListWithUrls
  }

  const handleFilesChange = async (files: FileList) => {
    // Initialize files in the UI with pending status
    const fileList = Array.from(files).map((file) => ({
      id: file.name,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 1,
      error: undefined,
    }))

    setSelectedFiles((prev) => [...prev, ...fileList])

    // Process uploads sequentially
    await uploadFilesToStorage(files)
  }

  const handleRemoveFile = (file: FileListItem) => {
    setSelectedFiles(selectedFiles.filter((f) => f.name !== file.name))
  }

  // if generalProgress is 100, then return undefined
  const generalProgress =
    selectedFiles.reduce((acc, file) => {
      return acc + (file.progress ?? 0)
    }, 0) / selectedFiles.length

  const hideGeneralProgress =
    selectedFiles.length === 0 ||
    selectedFiles.every((file) => file.progress === 100) ||
    generalProgress === 0

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
          isMultiple={multiple}
          accept={accept}
          error={error}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div
          className={`${classes.file_list_wrapper} ${classes.custom_file_list_container}`}
        >
          <FileList
            files={selectedFiles}
            onDelete={handleRemoveFile}
            generalProgress={hideGeneralProgress ? undefined : generalProgress}
          />
        </div>
      )}
    </div>
  )
}
