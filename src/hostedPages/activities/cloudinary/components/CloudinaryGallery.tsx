import React from 'react'

interface CloudinaryGalleryProps {
  cloudName: string
  filesUploaded: Array<string>
}

export const CloudinaryGallery = ({
  filesUploaded,
  cloudName,
}: CloudinaryGalleryProps) => {
  return (
    <div className="files">
      {!filesUploaded?.length && <p>No files were added yet.</p>}
      {!!filesUploaded?.length && (
        <p>You uploaded {filesUploaded.length} file(s)</p>
      )}
    </div>
  )
}
