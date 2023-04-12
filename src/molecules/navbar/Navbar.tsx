import React, { ReactElement } from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: string
  children?: ReactElement
}

export const Navbar = ({ companyName, logo }: NavbarProps): JSX.Element => {
  // is mobile and device height is reduced by a keyboard
  const isMobileAndKeyboardOpen = () => {
    const isTablet = window.innerWidth < 768
    const isKeyboardOpen = window.innerHeight < 500
    return isTablet && isKeyboardOpen
  }

  return (
    <div className={classes.awell_navbar}>
      {/* don't show the logo if the device is tablet and the height is reduced by a keyboard */}
      {isMobileAndKeyboardOpen() ? (
        <>{companyName}</>
      ) : (
        <Logo logo={logo} companyName={companyName} />
      )}
    </div>
  )
}
