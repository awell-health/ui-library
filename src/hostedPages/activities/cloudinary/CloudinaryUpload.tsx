import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button } from '../../../atoms'
import { CloudinaryUploadWidget } from './components'
import { AttachmentList } from '../../../molecules'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import { useScrollHint } from '../../../hooks'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'
import classes from './cloudinary.module.scss'
import {
  CloudinaryExtensionProps,
  MessageAttachment,
  MessageAttachmentType,
  OnFileUpload,
  UploadData,
} from './types'

export const CloudinaryUpload: FC<CloudinaryExtensionProps> = ({
  cloudName,
  uploadPreset,
  folder,
  tags,
  context,
  onFinish,
  text,
}) => {
  const { showScrollHint } = useScrollHint()

  const [uploadedFilesList, setUploadedFilesList] = useState<UploadData[]>([])

  const attachments: MessageAttachment[] = useMemo(
    () =>
      uploadedFilesList.map(({ url }, index) => ({
        id: `url-${index}`,
        url,
        type: MessageAttachmentType.File,
        name: text.attachmentLabel(index),
      })),
    [text, uploadedFilesList]
  )

  const onImageUploadHandler: OnFileUpload = useCallback((data) => {
    setUploadedFilesList((prevState) => [...prevState, data])
  }, [])

  const handleOnDone = useCallback(() => {
    onFinish(uploadedFilesList)
  }, [onFinish, uploadedFilesList])

  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={layoutClasses.main_content}
      >
        <section className={`${classes.awell_cloudinary} ${classes.container}`}>
          <div className={classes.message_title}>{text.subject}</div>
          <div className={classes.content}>
            <div className="files">
              <p>{text.fileCountHeader(uploadedFilesList?.length)}</p>
            </div>

            {!!attachments.length && (
              <div className={classes.attachmentList}>
                <AttachmentList
                  attachments={attachments}
                  icon={text.attachmentIcon}
                  labels={text.attachmentLabels}
                />
              </div>
            )}

            <CloudinaryUploadWidget
              cloudName={cloudName}
              uploadPreset={uploadPreset}
              folder={folder}
              tags={tags}
              context={context}
              onFileUpload={onImageUploadHandler}
              text={{ uploadButton: text.buttonLabels.upload }}
            />
          </div>
        </section>
      </main>

      <HostedPageFooter showScrollHint={showScrollHint}>
        <div className={`${classes.button_wrapper} ${classes.container}`}>
          <Button
            data-cy="finishUpload"
            variant="secondary"
            onClick={handleOnDone}
          >
            {text.buttonLabels.done}
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}

CloudinaryUpload.displayName = 'Cloudinary'
