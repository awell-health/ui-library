import React from 'react'
import { MessageAttachment } from '../../types/generated/types-orchestration'
import { AttachmentLabels } from '../../types'

export interface AttachmentListProps {
  attachments: Array<MessageAttachment>
  icon: React.ReactNode
  labels: AttachmentLabels
}
