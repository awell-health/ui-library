import React from 'react'
import { Button, RichTextViewer } from '../../../atoms'
import classes from './message.module.scss'
import { AttachmentList } from '../../../molecules'
import { MessageProps } from './types'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import { useScrollHint } from '../../../hooks/useScrollHint'

export const Message = ({
  onMessageRead,
  content,
  subject,
  children,
  format,
  attachmentIcon,
  attachmentLabels,
  attachments,
  buttonLabels,
}: MessageProps): JSX.Element => {
  const { showScrollHint } = useScrollHint()

  return (
    <>
      <article className={`${classes.awell_message} ${classes.container}`}>
        <div className={classes.message_title}>{subject}</div>
        <div className={classes.content}>
          <RichTextViewer nodes={content} format={format} />
        </div>

        <div className={classes.attachmentList}>
          <AttachmentList
            attachments={attachments}
            icon={attachmentIcon}
            labels={attachmentLabels}
          />
          {children}
        </div>
      </article>
      <HostedPageFooter showScrollHint={showScrollHint}>
        <div className={`${classes.button_wrapper} ${classes.container}`}>
          <Button variant="secondary" onClick={onMessageRead}>
            {buttonLabels.readMessage}
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}
