import React from 'react'
import { Button, RichTextViewer } from '../../../atoms'
import classes from './message.module.scss'
import { AttachmentList } from '../../../molecules'
import { MessageProps } from './types'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import { generatePureHtml } from '../../../atoms/richTextViewer/serializeHtml'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'

export const Message = ({
  onMessageRead,
  content,
  subject,
  children,
  attachmentIcon,
  attachmentLabels,
  attachments,
  buttonLabels,
}: MessageProps): JSX.Element => {
  const cleanContent = generatePureHtml(content)

  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={layoutClasses.main_content}
      >
        <article className={`${classes.awell_message} ${classes.container}`}>
          <div className={classes.message_title}>{subject}</div>
          <div className={classes.content}>
            <RichTextViewer content={cleanContent} />
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
      </main>
      <HostedPageFooter>
        <div className={`${classes.button_wrapper} ${classes.container}`}>
          <Button
            data-cy="markMessageAsReadButton"
            variant="secondary"
            onClick={onMessageRead}
          >
            {buttonLabels.readMessage}
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}
