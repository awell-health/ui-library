import React, { ReactElement, useRef } from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: string
  children?: ReactElement
}

export const Navbar = ({ companyName, logo }: NavbarProps): JSX.Element => {
  const [innerHeight, setInnerHeight] = React.useState(window.innerWidth)
  const originalHeight = useRef(window.innerHeight)

  const isVirtualKeyboardOpen = innerHeight < originalHeight.current * 0.8 // 80% of the original height

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
      className={`${classes.awell_navbar} ${
        isVirtualKeyboardOpen ? classes.awell_navbar_keyboard_open : ''
      }`}
    >
      {/* don't show the logo if the device is tablet and the height is reduced by a keyboard */}
      {isVirtualKeyboardOpen ? (
        <></>
      ) : (
        <Logo logo={logo} companyName={companyName} />
      )}
    </div>
  )
}
