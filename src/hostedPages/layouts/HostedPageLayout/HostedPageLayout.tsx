import React, { FC } from 'react'
import { Navbar } from '../../../molecules'
import { CloseButton } from './CloseButton'
import classes from './hostedPageLayout.module.scss'

export interface HostedPageLayoutProps {
  children: React.ReactNode | string
  onCloseHostedPage: () => void
  logo?: string
  companyName?: string
}

export const HostedPageLayout: FC<HostedPageLayoutProps> = ({
  children,
  onCloseHostedPage,
  logo,
  companyName,
}) => {
  return (
    <div className={classes.layout_container}>
      <CloseButton onClose={onCloseHostedPage} />
      <header>
        <Navbar logo={logo} companyName={companyName} />
      </header>
      {children}
    </div>
  )
}
