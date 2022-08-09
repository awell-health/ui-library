export enum MessageAttachmentType {
  File = 'FILE',
  Link = 'LINK',
  Video = 'VIDEO',
}

export type MessageAttachment = {
  id: string
  name: string
  type: MessageAttachmentType
  url: string
}
