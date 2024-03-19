import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ThemeProvider } from '../../../atoms'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'
import { CloudinaryUpload as CloudinaryUploadComponent } from './CloudinaryUpload'
import { CloudinarySingleFileUpload as CloudinarySingleFileUploadComponent } from './CloudinarySingleFileUpload'
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
    multiple: {
      control: 'boolean',
      defaultValue: true,
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

export const CloudinaryUpload: Story = ({
  cloudName,
  uploadPreset,
  folder,
  context,
  tags,
  multiple,
}) => {
  return (
    <HostedPageLayout
      logo={
        'https://res.cloudinary.com/da7x4rzl4/image/upload/v1710884206/Developer%20portal/awell_logo.svg'
      }
      onCloseHostedPage={() => alert('Stop session')}
    >
      {Boolean(multiple) === true ? (
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
      ) : (
        <CloudinarySingleFileUploadComponent
          cloudName={cloudName}
          uploadPreset={uploadPreset}
          context={context}
          folder={folder}
          tags={tags}
          onFinish={(file) => alert(`Image uploaded ${file}`)}
          text={{
            subject: 'Upload file',
            attachmentIcon: <img src={image} alt="" />,
            attachmentLabels: {
              file: 'View file',
              video: 'Open video',
              link: 'Open link',
            },
            fileCountHeader: (fileUploaded) =>
              fileUploaded
                ? `You have successfully uploaded a file.`
                : 'You have not uploaded a file yet.',
            buttonLabels: {
              upload: 'Upload file',
              done: 'Done',
            },
          }}
        />
      )}
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
