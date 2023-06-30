import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HostedPageLayout as HostedPageLayoutComponent } from './HostedPageLayout'
import { ThemeProvider } from '../../../atoms'
import { HostedPageFooter } from './HostedPageFooter'
import classes from './hostedPageLayout.module.scss'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export default {
  title: 'HostedPages/Layout',
  component: HostedPageLayoutComponent,
  argTypes: {},
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const HostedPageLayout: Story = () => {
  return (
    <HostedPageLayoutComponent onCloseHostedPage={() => alert('Handle close')}>
      <main className={classes.main_content} style={{ textAlign: 'center' }}>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </main>
      <HostedPageFooter>Footer</HostedPageFooter>
    </HostedPageLayoutComponent>
  )
}

export const HostedPageLayoutMobile: Story = () => {
  return (
    <HostedPageLayoutComponent onCloseHostedPage={() => alert('Handle close')}>
      <main className={classes.main_content} style={{ textAlign: 'center' }}>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </main>
      <HostedPageFooter>Footer</HostedPageFooter>
    </HostedPageLayoutComponent>
  )
}

HostedPageLayoutMobile.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
}
