import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  HostedPageLayout as HostedPageLayoutComponent,
  HostedPageLayoutProps,
} from './HostedPageLayout'
import { ThemeProvider } from '../../../atoms'
import { HostedPageFooter } from './HostedPageFooter'
import classes from './hostedPageLayout.module.scss'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export default {
  title: 'HostedPages/Layout',
  component: HostedPageLayoutComponent,
  argTypes: {
    logo: {
      control: 'text',
      defaultValue:
        'https://res.cloudinary.com/da7x4rzl4/image/upload/v1710884206/Developer%20portal/awell_logo.svg',
    },
    hideCloseButton: {
      control: 'boolean',
      defaultValue: false,
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

export const HostedPageLayout: Story<HostedPageLayoutProps> = ({
  logo,
  hideCloseButton,
}) => {
  return (
    <HostedPageLayoutComponent
      logo={logo}
      hideCloseButton={hideCloseButton}
      onCloseHostedPage={() => alert('Handle close')}
    >
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

export const HostedPageLayoutMobile: Story<HostedPageLayoutProps> = ({
  logo,
  hideCloseButton,
}) => {
  return (
    <HostedPageLayoutComponent
      logo={logo}
      hideCloseButton={hideCloseButton}
      onCloseHostedPage={() => alert('Handle close')}
    >
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
