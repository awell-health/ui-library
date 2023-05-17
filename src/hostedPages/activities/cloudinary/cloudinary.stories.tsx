import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { CloudinaryExtensionProps } from './types'
import { ThemeProvider } from '../../../atoms'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'
import { CloudinaryUpload as CloudinaryUploadComponent } from './CloudinaryUpload'
import image from '../../../assets/link.svg'

export default {
  title: 'HostedPages/Activities/Cloudinary/CloudinaryUpload',
  component: CloudinaryUploadComponent,
  argTypes: {
    cloudName: {
      control: 'text',
      defaultValue: '',
    },
    uploadPreset: {
      control: 'text',
      defaultValue: '',
    },
    folder: {
      control: 'text',
      defaultValue: '',
    },
    context: {
      control: 'object',
      defaultValue: {},
    },
    tags: {
      control: 'object',
      defaultValue: [],
    },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const CloudinaryUpload: Story<CloudinaryExtensionProps> = ({
  cloudName,
  uploadPreset,
  folder,
  context,
  tags,
}) => {
  return (
    <HostedPageLayout onCloseHostedPage={() => alert('Stop session')}>
      <CloudinaryUploadComponent
        cloudName={cloudName}
        uploadPreset={uploadPreset}
        context={context}
        folder={folder}
        tags={tags}
        onFinish={(files) => alert(`Image uploaded ${files}`)}
        text={{
          subject: 'Upload files',
          attachmentIcon: <img src={image} alt="" />,
          attachmentLabels: {
            file: 'View file',
            video: 'Open video',
            link: 'Open link',
          },
          fileCountHeader: (count) =>
            count > 0
              ? `You have uploaded ${count} file${count > 1 ? 's.' : '.'}`
              : 'You have not uploaded any files yet.',
          buttonLabels: {
            upload: 'Upload files',
            done: 'Done',
          },
        }}
      />
    </HostedPageLayout>
  )
}

CloudinaryUpload.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
