import {
  Configuration,
  Cloudinary as CoreCloudinary,
  Util,
} from 'cloudinary-core'
import { type UploadWidgetOptions } from './types'

export const url = (publicId: string, options: Configuration.Options) => {
  try {
    const scOptions = Util.withSnakeCaseKeys(options)
    const cl = CoreCloudinary.new(options)
    return cl.url(publicId, scOptions)
  } catch (e) {
    return null
  }
}

export const openUploadWidget = (
  options: UploadWidgetOptions,
  callback: (error: unknown, result: Record<string, unknown>) => void
): { open: () => void } => {
  if (window?.cloudinary === undefined) {
    throw new Error('Cloudinary is not instantiated on window.')
  }

  return (window.cloudinary as any).createUploadWidget(options, callback)
}
