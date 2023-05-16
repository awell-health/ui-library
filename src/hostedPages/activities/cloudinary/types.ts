export interface CloudinaryExtensionProps {
  cloudName: string
  uploadPreset: string
  folder?: string
  tags?: string[]
  context?: Record<string, string>
  onFinish: (fileList: string[]) => void
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
