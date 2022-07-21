import React, { ReactElement } from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: string
  children?: ReactElement
}

export const Navbar = ({
  children,
  ...logoProps
}: NavbarProps): JSX.Element => {
  return (
    <div className={classes.awell_navbar}>
      <Logo {...logoProps} />
      {/*<div>*/}
      {/*    {children}*/}
      {/*</div>*/}
    </div>
  )
}
