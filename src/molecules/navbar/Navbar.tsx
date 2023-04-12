import React, { ReactElement } from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: string
  children?: ReactElement
}

export const Navbar = ({ companyName, logo }: NavbarProps): JSX.Element => {
  const [windowSize, setWindowSize] = React.useState([0, 0])
  const isMobileAndKeyboardOpen = () => {
    const isKeyboardOpen = windowSize[1] < 500
    return isKeyboardOpen
  }

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerHeight])

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
