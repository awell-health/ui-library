import React, { FC } from 'react'
import { Navbar } from '../../../molecules'
import { CloseButton } from './CloseButton'
import classes from './hostedPageLayout.module.scss'

export interface HostedPageLayoutProps {
  children: React.ReactNode | string
  onCloseHostedPage: () => void
  logo?: JSX.Element | string
}

export const HostedPageLayout: FC<HostedPageLayoutProps> = ({
  children,
  onCloseHostedPage,
  logo,
}) => {
  return (
    <div className={classes.layout_container}>
      <CloseButton onClose={onCloseHostedPage} />
      <header>
        <Navbar logo={logo} />
      </header>
      {children}
    </div>
  )
}
