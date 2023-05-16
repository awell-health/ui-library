import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { CloudinaryExtensionProps } from './types'
import { ThemeProvider } from '../../../atoms'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'
import { CloudinaryExtension } from './CloudinaryExtension'

export default {
  title: 'HostedPages/Activities/Cloudinary',
  component: CloudinaryExtension,
  argTypes: {
    cloudName: {
      control: 'text',
      defaultValue: 'dip5c2e0n',
    },
    uploadPreset: {
      control: 'text',
      defaultValue: 'mufwljl2',
    },
    folder: {
      control: 'text',
      defaultValue: 'awell',
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

export const Cloudinary: Story<CloudinaryExtensionProps> = ({
  cloudName,
  uploadPreset,
  folder,
  context,
  tags,
}) => {
  return (
    <HostedPageLayout onCloseHostedPage={() => alert('Stop session')}>
      <CloudinaryExtension
        cloudName={cloudName}
        uploadPreset={uploadPreset}
        context={context}
        folder={folder}
        tags={tags}
        onFinish={(files) => alert(`Image uploaded ${files}`)}
      />
    </HostedPageLayout>
  )
}

Cloudinary.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
