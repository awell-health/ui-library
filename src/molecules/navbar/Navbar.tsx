import React, { ReactElement } from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: JSX.Element | string
  children?: ReactElement
}

export const Navbar = ({ companyName, logo }: NavbarProps): JSX.Element => {
  return (
    <div className={classes.awell_navbar}>
      <Logo logo={logo} companyName={companyName} />
    </div>
  )
}
