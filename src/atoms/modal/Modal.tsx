import React, { FC, useEffect, useState } from 'react'
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

import classes from './Modal.module.scss'
import { Button } from '../button'

export interface ModalProps {
  isOpen: boolean
  title: string
  description: string
  onClose: () => void
  onConfirm: () => void
  icon?: 'success' | 'warning'
  buttonLabels: {
    cancel: string
    confirm: string
  }
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  icon,
  buttonLabels,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 640)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  if (isOpen) {
    return (
      <div className={classes.dialog}>
        <div className={classes.screen_overlay} />

        <div className={classes.modal_overlay}>
          <div className={classes.modal_wrapper}>
            <div className={classes.dialog_panel}>
              <div className={classes.close_button_wrapper}>
                <button
                  type="button"
                  className={classes.close_button}
                  onClick={onClose}
                >
                  <span className={classes.sr_only}>Close</span>
                  <XMarkIcon
                    className={classes.close_icon}
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className={classes.modal_body}>
                {icon && (
                  <div className={`${classes.icon_wrapper} ${classes[icon]}`}>
                    {icon === 'warning' && (
                      <ExclamationTriangleIcon
                        className={`${classes.modal_icon} ${classes.warning}`}
                        aria-hidden="true"
                      />
                    )}
                    {icon === 'success' && (
                      <CheckIcon
                        className={`${classes.modal_icon} ${classes.success}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )}
                <div className={classes.modal_content}>
                  <div className={classes.modal_title}>{title}</div>
                  <div className={classes.modal_content_text}>
                    {description}
                  </div>
                </div>
              </div>
              <div className={classes.modal_actions}>
                {onConfirm && (
                  <Button
                    variant="primary"
                    onClick={onConfirm}
                    fullWidth={isMobile}
                  >
                    {buttonLabels?.confirm}
                  </Button>
                )}
                <Button
                  variant="tertiary"
                  onClick={onClose}
                  fullWidth={isMobile}
                >
                  {buttonLabels?.cancel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
