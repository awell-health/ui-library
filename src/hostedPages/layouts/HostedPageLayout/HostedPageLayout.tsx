import React, { FC } from 'react'
import { Navbar } from '../../../molecules'
import { CloseButton } from './CloseButton'
import classes from './hostedPageLayout.module.scss'
import { useTheme } from '../../../atoms/themeProvider/ThemeProvider'

export interface HostedPageLayoutProps {
  children: React.ReactNode | string
  onCloseHostedPage: () => void
  logo?: JSX.Element | string
  hideCloseButton?: boolean
}

export const HostedPageLayout: FC<HostedPageLayoutProps> = ({
  children,
  onCloseHostedPage,
  logo,
  hideCloseButton = false,
}) => {
  const { layoutMode } = useTheme()

  return (
    <div
      className={`${classes.layout_container} ${classes[layoutMode]} ${
        logo ? '' : classes.withoutLogo
      }`}
    >
      {!hideCloseButton && <CloseButton onClose={onCloseHostedPage} />}
      {logo && (
        <header>
          <Navbar logo={logo} />
        </header>
      )}
      {children}
    </div>
  )
}
