import React, { useMemo } from 'react'
import { Button } from '../../../../atoms'
import { useHtmlScript } from '../../../../hooks'

import { createUploadWidget } from '../utils'
import { UploadData, UploadWidgetOptions } from '../types'

interface CloudinaryUploadWidgetProps extends UploadWidgetOptions {
  onFileUpload: (params: UploadData) => void
  text: {
    uploadButton: string
  }
}

export const CloudinaryUploadWidget = ({
  onFileUpload: onFileUpload,
  text,
  ...widgetOptions
}: CloudinaryUploadWidgetProps) => {
  const { isLoaded } = useHtmlScript(
    'https://widget.cloudinary.com/v2.0/global/all.js'
  )

  const widget = useMemo(() => {
    return isLoaded
      ? createUploadWidget(
          {
            ...widgetOptions,
            sources: ['local'],
          },
          function (error: unknown, result: Record<string, any>) {
            if (!error && result?.event === 'success') {
              onFileUpload({
                publicId: result?.info?.public_id,
                url: result?.info?.url,
                original_filename: result?.info?.original_filename,
              })
            }
          }
        )
      : undefined
  }, [isLoaded, onFileUpload, widgetOptions])

  const uploadFileWidget = () => {
    widget?.open()
  }

  return (
    <Button onClick={uploadFileWidget} disabled={!isLoaded}>
      {text.uploadButton}
    </Button>
  )
}
