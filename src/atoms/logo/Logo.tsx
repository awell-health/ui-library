import React from 'react'
import classes from './logo.module.scss'
import awellLogo from './../../assets/logo.svg'

export interface LogoProps {
  /**
   * company name will be used in "alt" attribute to provide info about your company
   * when image is not loading correctly and for users who use assistive technologies
   */
  companyName?: string
  logo?: string
}

export const Logo = ({
  companyName = 'Awell Health',
  logo = awellLogo,
}: LogoProps): JSX.Element => {
  return <img className={classes.awell_logo} alt={companyName} src={logo} />
}
