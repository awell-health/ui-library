import React from 'react'
import { MessageAttachment } from '../../types/generated/types-orchestration'

export interface AttachmentListProps {
  attachments: Array<MessageAttachment>
  icon: React.ReactNode
  label: string
}
