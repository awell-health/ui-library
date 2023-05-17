import React, { useMemo } from 'react'
import { Button } from '../../../../atoms'
import { useHtmlScript } from '../../../../hooks'

import { createUploadWidget } from '../utils'
import { UploadWidgetOptions } from '../types'

interface CloudinaryUploadWidgetProps extends UploadWidgetOptions {
  onFileUpload: (params: { publicId: string; url: string }) => void
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
