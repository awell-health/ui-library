import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Navbar as NavbarComponent, type NavbarProps } from './Navbar'

export default {
  title: 'Molecules/Navbar',
  component: NavbarComponent,
  argTypes: {
    logo: {
      control: 'text',
      defaultValue: undefined,
    },
    companyName: {
      control: 'text',
      defaultValue: 'Awell Health',
    },
  },
} as Meta

export const Navbar: Story = ({ logo, companyName }: NavbarProps) => {
  return <NavbarComponent logo={logo} companyName={companyName} />
}
