import { AttachmentLabels } from '../../../types'
import {
  type MessageAttachment,
  MessageAttachmentType,
} from '../../../types/generated/types-orchestration'

export { MessageAttachment, MessageAttachmentType }

export type UploadData = {
  publicId: string
  url: string
  original_filename: string
}
export type OnFileUpload = (data: UploadData) => void

export interface CloudinaryExtensionProps {
  cloudName: string
  uploadPreset: string
  folder?: string
  tags?: string[]
  context?: Record<string, string>
  onFinish: (data: UploadData[]) => void
  text: {
    subject: string
    fileCountHeader: (count: number) => string
    attachmentIcon: React.ReactNode
    attachmentLabels: AttachmentLabels
    buttonLabels: {
      upload: string
      done: string
    }
  }
}

export interface CloudinarySingleFileUploadProps
  extends Omit<CloudinaryExtensionProps, 'onFinish' | 'text'> {
  onFinish: (data: UploadData | undefined) => void
  text: {
    subject: string
    fileCountHeader: (fileUploaded: boolean) => string
    attachmentIcon: React.ReactNode
    attachmentLabels: AttachmentLabels
    buttonLabels: {
      upload: string
      done: string
    }
  }
}

export type CloudinaryExtensionSettings = {
  cloudName: string
  uploadPreset: string
  folder?: string
}

export enum ActionKey {
  UPLOAD_FILES = 'uploadFiles',
}

export type UploadFilesFields = {
  uploadPreset?: string
  folder?: string
  tags?: string
}

type ResourceType = 'auto' | 'image' | 'video' | 'raw'
type SourceType =
  | 'local'
  | 'url'
  | 'camera'
  | 'dropbox'
  | 'image_search'
  | 'facebook'
  | 'instagram'
  | 'shutterstock'
  | 'gettyimages'
  | 'istock'
  | 'unsplash'
  | 'google_drive'

export interface UploadWidgetOptions {
  cloudName: string
  uploadPreset: string
  multiple?: boolean
  maxFiles?: number
  folder?: string
  tags?: string[]
  sources?: SourceType[]
  resourceType?: ResourceType
  clientAllowedFormats?: string[]
  maxFileSize?: number
  maxImageFileSize?: number
  maxVideoFileSize?: number
  context?: Record<string, string>
}

export interface ProductGalleryOptions {
  cloudName: string
  container: string
  multiple?: boolean
  maxFiles?: number
  folder?: string
  tags?: string[]
  sources?: SourceType[]
  resourceType?: ResourceType
  clientAllowedFormats?: string[]
  maxFileSize?: number
  maxImageFileSize?: number
  maxVideoFileSize?: number
  context?: Record<string, string>
}
