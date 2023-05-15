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

  // When a virtual keyboard is opened on mobile devices, the window.innerHeight
  // is reduced by at least 20% of the original height. There is no non-experimental
  // way (see https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API)
  // to detect a virtual keyboard, so we are using a heuristic to determine if
  // the height is reduced by a keyboard or not.
  const isHeightReduced = innerHeight < originalHeight.current * 0.8 // 80% of the original height

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
        isHeightReduced ? classes.awell_navbar_keyboard_open : ''
      }`}
    >
      {isHeightReduced ? <></> : <Logo logo={logo} companyName={companyName} />}
    </div>
  )
}
