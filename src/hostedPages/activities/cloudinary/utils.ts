import 'cloudinary-core'
import { type UploadWidgetOptions } from './types'

export const createUploadWidget = (
  options: UploadWidgetOptions,
  callback: (error: unknown, result: Record<string, unknown>) => void
): { open: () => void } => {
  if (window?.cloudinary === undefined) {
    throw new Error('Cloudinary is not instantiated on window.')
  }

  return (window.cloudinary as any).createUploadWidget(options, callback)
}
