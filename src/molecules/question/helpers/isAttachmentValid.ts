import { isNil } from 'lodash'
import { Attachment } from '../types'

export const isAttachmentValid = ({
  attachmentsValue,
  required,
  acceptedFileTypes,
}: {
  attachmentsValue: string
  acceptedFileTypes: string[]
  required: boolean
}) => {
  const parseAttachment = (val: string): Attachment | null => {
    try {
      const parsed = JSON.parse(val)
      return parsed // Return the parsed object directly
    } catch (error) {
      return null
    }
  }

  const attachment: Attachment | null = parseAttachment(attachmentsValue)

  if (required) {
    return !isNil(attachment) && !isNil(attachment.url)
  }

  // If not required and no attachment is provided, it's valid
  if (isNil(attachment) || isNil(attachment.contentType)) {
    return !required
  }

  // Check if the file type is accepted
  return acceptedFileTypes.includes(attachment.contentType)
}
