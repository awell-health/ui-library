import React from 'react'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { Cloudinary } from '@cloudinary/url-gen'

interface CloudinaryPhotoProps {
  cloudName: string
  publicId?: string
}

export const CloudinaryPhoto = ({
  cloudName,
  publicId,
}: CloudinaryPhotoProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  })

  const myImage = cld.image(publicId)
  myImage.resize(fill().width(250).height(250)).delivery(quality(60))

  return (
    <AdvancedImage
      cldImg={myImage}
      plugins={[lazyload(), placeholder({ mode: 'blur' })]}
    />
  )
}
