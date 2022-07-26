import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Logo as LogoComponent, LogoProps } from '.'
import awellHealthLogo from './../../assets/logo.svg'

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
        <StoryComponent />
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
