import React, { useMemo } from 'react'
import { Button } from '../../../../atoms'
import { useScript } from '../../../../hooks'

import { openUploadWidget } from '../utils/CloudinaryService'
import { UploadWidgetOptions } from '../utils/types'

interface CloudinaryUploadWidgetProps extends UploadWidgetOptions {
  onFileUpload: (publicId: string) => void
}

export const CloudinaryUploadWidget = ({
  onFileUpload: onFileUpload,
  ...widgetOptions
}: CloudinaryUploadWidgetProps) => {
  const { isLoaded } = useScript(
    'https://widget.cloudinary.com/v2.0/global/all.js'
  )

  const widget = useMemo(() => {
    return isLoaded
      ? openUploadWidget(
          {
            ...widgetOptions,
            sources: ['local'],
          },
          function (error: unknown, result: Record<string, unknown>) {
            if (!error && result?.event === 'success') {
              onFileUpload((result?.info as any)?.public_id)
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
      Upload File
    </Button>
  )
}
