import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Logo as LogoComponent, LogoProps } from '.'
import awellHealthLogo from './../../assets/logo.svg'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Logo',
  component: LogoComponent,
  argTypes: {
    companyName: {
      control: 'text',
      defaultValue: 'Awell Health',
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const Logo: Story<LogoProps> = ({
  companyName,
  logo = awellHealthLogo,
}) => {
  return <LogoComponent companyName={companyName} logo={logo} />
}

Logo.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
