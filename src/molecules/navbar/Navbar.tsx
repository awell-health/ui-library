import React, { ReactElement, useRef } from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: JSX.Element | string
  children?: ReactElement
}

export const Navbar = ({ companyName, logo }: NavbarProps): JSX.Element => {
  const [innerHeight, setInnerHeight] = React.useState(window.innerWidth)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight === innerHeight) return
      setInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`${classes.awell_navbar} ${classes.awell_navbar_keyboard_open}`}
    >
      <Logo logo={logo} companyName={companyName} />
    </div>
  )
}
