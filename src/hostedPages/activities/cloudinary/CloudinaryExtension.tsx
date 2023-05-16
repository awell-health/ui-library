import React, { FC, useCallback, useState } from 'react'
import { Button } from '../../../atoms'
import { CloudinaryGallery, CloudinaryUploadWidget } from './components'
import { CloudinaryExtensionProps } from './types'

export const CloudinaryExtension: FC<CloudinaryExtensionProps> = ({
  cloudName,
  uploadPreset,
  folder,
  tags,
  context,
  onFinish,
}) => {
  const [uploadedFilesList, setUploadedFilesList] = useState<string[]>([])

  const onImageUploadHandler = useCallback((publicId: string) => {
    setUploadedFilesList((prevState) => [...prevState, publicId])
  }, [])

  const handleOnDone = useCallback(() => {
    onFinish(uploadedFilesList)
  }, [onFinish, uploadedFilesList])

  return (
    <div>
      <CloudinaryUploadWidget
        cloudName={cloudName}
        uploadPreset={uploadPreset}
        folder={folder}
        tags={tags}
        context={context}
        onFileUpload={onImageUploadHandler}
      />

      <br />
      <br />

      <CloudinaryGallery
        cloudName={cloudName}
        filesUploaded={uploadedFilesList}
      />

      <br />
      <br />

      <Button onClick={handleOnDone}>Finish</Button>
    </div>
  )
}

CloudinaryExtension.displayName = 'CloudinaryExtension'
