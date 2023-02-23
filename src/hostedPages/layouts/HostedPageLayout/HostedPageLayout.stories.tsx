import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HostedPageLayout as HostedPageLayoutComponent } from './HostedPageLayout'
import { ThemeProvider } from '../../../atoms'
import { HostedPageFooter } from './HostedPageFooter'

export default {
  title: 'HostedPages/Layout/HostedPageLayout',
  component: HostedPageLayoutComponent,
  argTypes: {},
  decorators: [
    (StoryComponent) => (
      <div style={{ minHeight: '100vh' }}>
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const HostedPageLayout: Story = () => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <HostedPageLayoutComponent
        onCloseHostedPage={() => alert('Handle close')}
      >
        <main style={{ textAlign: 'center' }}>
          <p>Content</p>
        </main>
        <HostedPageFooter>Footer</HostedPageFooter>
      </HostedPageLayoutComponent>
    </ThemeProvider>
  )
}
