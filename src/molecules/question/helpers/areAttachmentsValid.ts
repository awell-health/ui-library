import { isNil } from 'lodash'
import { Attachment } from '../types'
import { isAcceptedMimeType } from './isAcceptedMimeType'

export const areAttachmentsValid = ({
  attachmentsValue,
  required,
  acceptedFileTypes,
}: {
  attachmentsValue: string
  acceptedFileTypes: string[]
  required: boolean
}) => {
  const parseAttachments = (val: string): Attachment[] => {
    try {
      const parsed = JSON.parse(val)
      if (isNil(parsed)) return []
      // A single upload is stored as one object; normalise to an array.
      return Array.isArray(parsed) ? parsed : [parsed]
    } catch (error) {
      return []
    }
  }

  const attachments = parseAttachments(attachmentsValue)

  if (required) {
    return attachments.length > 0
  }

  // Not required: any provided attachments must be of an accepted type
  // (supports `image/*`-style wildcards).
  return attachments.every((attachment) =>
    isAcceptedMimeType(attachment.contentType ?? '', acceptedFileTypes)
  )
}
