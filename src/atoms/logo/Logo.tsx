import React from 'react';
import classes from './logo.module.scss';
import awellLogo from './../../assets/logo.svg';

export interface LogoProps {
  companyName?: string
  logo?: string
}

export const Logo = ({companyName="Awell Health", logo = awellLogo}: LogoProps):JSX.Element => {
  return (
    <img className={classes.awell_logo} alt={companyName} src={logo} />
  );
}
