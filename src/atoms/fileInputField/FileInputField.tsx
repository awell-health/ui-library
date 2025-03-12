import {
  FileList,
  type FileListItem,
  FileUpload,
} from '@awell-health/design-system'
import React, { useEffect, useState } from 'react'
import classes from './FileInputField.module.scss'
import { Attachment } from '../../molecules/question/types'

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
  onFileUpload?: (file: File, configId?: string) => Promise<string | undefined>
  configId?: string
  value?: Array<Attachment>
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
  configId,
  value,
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

  const uploadFilesToStorage = async (files: FileList) => {
    const fileListWithUrls: Array<FileListItem & { url?: string }> =
      await Promise.all(
        Array.from(files).map(async (file) => {
          try {
            const fileUrl = await onFileUpload?.(file, configId)
            return {
              id: file.name,
              name: file.name,
              size: file.size,
              type: file.type,
              progress: 100,
              error: undefined,
              url: fileUrl,
            }
          } catch (error) {
            return {
              id: file.name,
              name: file.name,
              size: file.size,
              type: file.type,
              progress: 0,
              error:
                error instanceof Error ? error.message : 'File upload failed',
              url: undefined,
            }
          }
        })
      )

    return fileListWithUrls
  }

  const handleFilesChange = async (files: FileList) => {
    const fileList = Array.from(files).map((file) => ({
      id: file.name,
      name: `${file.name} (uploading...)`,
      size: file.size,
      type: file.type,
      progress: 0,
      error: undefined,
    }))
    setSelectedFiles((prev) => [...prev, ...fileList])
    const fileListWithUrls = await uploadFilesToStorage(files)
    // replace the uploading files with the uploaded files
    setSelectedFiles((prev) =>
      prev.map((file) => fileListWithUrls.find((f) => f.id === file.id) || file)
    )
  }

  const handleRemoveFile = (file: FileListItem) => {
    setSelectedFiles(selectedFiles.filter((f) => f.name !== file.name))
  }

  return (
    <div
      key={id}
      className={`${classes.file_input_field_container} ${className}`}
      data-cy={dataCy}
    >
      {error && <div className={classes.error_message}>{error}</div>}

      <div className={classes.file_upload_wrapper}>
        <FileUpload
          onChange={handleFilesChange}
          onError={onError}
          isMultiple={multiple}
          accept={accept}
          label={label}
          error={error}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className={classes.file_list_wrapper}>
          <FileList files={selectedFiles} onDelete={handleRemoveFile} />
        </div>
      )}
    </div>
  )
}
