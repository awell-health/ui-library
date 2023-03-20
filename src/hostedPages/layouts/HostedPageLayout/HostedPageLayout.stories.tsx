import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { HostedPageLayout as HostedPageLayoutComponent } from './HostedPageLayout'
import { ThemeProvider } from '../../../atoms'
import { HostedPageFooter } from './HostedPageFooter'
import classes from './hostedPageLayout.module.scss'

export default {
  title: 'HostedPages/Layout/HostedPageLayout',
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
      </main>
      <HostedPageFooter>Footer</HostedPageFooter>
    </HostedPageLayoutComponent>
  )
}
