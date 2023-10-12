import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button } from '../../../atoms'
import { CloudinaryUploadWidget } from './components'
import { AttachmentList } from '../../../molecules'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import { useScrollHint } from '../../../hooks'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'
import classes from './cloudinary.module.scss'
import {
  CloudinarySingleFileUploadProps,
  MessageAttachment,
  MessageAttachmentType,
  OnFileUpload,
  UploadData,
} from './types'

export const CloudinarySingleFileUpload: FC<
  CloudinarySingleFileUploadProps
> = ({ cloudName, uploadPreset, folder, tags, context, onFinish, text }) => {
  const { showScrollHint } = useScrollHint()

  const [uploadedFile, setUploadedFile] = useState<UploadData | undefined>(
    undefined
  )

  const attachments: MessageAttachment[] = useMemo(
    () => [
      {
        id: `url-${uploadedFile?.publicId}`,
        url: uploadedFile?.url || '',
        type: MessageAttachmentType.File,
        name: uploadedFile?.original_filename || '',
      },
    ],
    [uploadedFile]
  )

  const onImageUploadHandler: OnFileUpload = useCallback((data) => {
    setUploadedFile(data)
  }, [])

  const handleOnDone = useCallback(() => {
    onFinish(uploadedFile)
  }, [onFinish, uploadedFile])

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
              <p>{text.fileCountHeader(uploadedFile !== undefined)}</p>
            </div>

            {uploadedFile && (
              <div className={classes.attachmentList}>
                <AttachmentList
                  attachments={attachments}
                  icon={text.attachmentIcon}
                  labels={text.attachmentLabels}
                />
              </div>
            )}

            {!uploadedFile && (
              <CloudinaryUploadWidget
                cloudName={cloudName}
                uploadPreset={uploadPreset}
                multiple={false}
                folder={folder}
                tags={tags}
                context={context}
                onFileUpload={onImageUploadHandler}
                text={{ uploadButton: text.buttonLabels.upload }}
              />
            )}
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

CloudinarySingleFileUpload.displayName = 'CloudinarySingleFileUpload'
