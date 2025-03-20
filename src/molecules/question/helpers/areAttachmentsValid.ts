import { isNil } from 'lodash'
import { Attachment } from '../types'

export const areAttachmentsValid = ({
  attachmentsValue,
  required,
  acceptedFileTypes,
}: {
  attachmentsValue: string
  acceptedFileTypes: string[]
  required: boolean
}) => {
  const parseAttachments = (val: string) => {
    try {
      return JSON.parse(val)
    } catch (error) {
      return []
    }
  }

  const attachments: Attachment[] = parseAttachments(attachmentsValue)

  if (required) {
    return !isNil(attachments) && attachments.length > 0
  }

  return attachments.every((attachment) =>
    acceptedFileTypes.includes(attachment.contentType ?? '')
  )
}
