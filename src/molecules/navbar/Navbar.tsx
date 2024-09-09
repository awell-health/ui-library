import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classes from './navbar.module.scss'
import { Logo } from '../../atoms/logo'

export interface NavbarProps {
  companyName?: string
  logo?: JSX.Element | string
  children?: ReactElement
}

export const Navbar = ({ companyName, logo }: NavbarProps): JSX.Element => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const originalHeight = useRef(window.innerHeight) // Capture initial height only once

  /** Heuristic to detect if a virtual keyboard is open by comparing
   * the current height to 80% of the original height
   **/
  const isHeightReduced = useMemo(
    () => innerHeight < originalHeight.current * 0.8, // 80% of the original height
    [innerHeight] // Recalculate only when innerHeight changes
  )

  const handleResize = useCallback(() => {
    if (window.innerHeight !== innerHeight) {
      setInnerHeight(window.innerHeight)
    }
  }, [innerHeight])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  console.log('isHeightReduced', isHeightReduced)
  console.log('innerHeight', innerHeight)
  console.log('originalHeight', originalHeight.current)
  console.log('window.innerHeight', window.innerHeight)

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
