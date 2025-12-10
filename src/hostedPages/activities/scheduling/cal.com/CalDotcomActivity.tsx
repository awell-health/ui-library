import React from 'react'
import classes from './calDotcomActivity.module.scss'
import { CalDotComActivityProps } from './types'
import { HostedPageFooter } from '../../../layouts/HostedPageLayout/HostedPageFooter'
import { CalDotComScheduling, Button } from '../../../../atoms'
import layoutClasses from '../../../layouts/HostedPageLayout/hostedPageLayout.module.scss'

export const CalDotcomActivity = ({
  calLink,
  calOrigin,
  onBookingSuccessful,
  hideEventTypeDetails,
}: CalDotComActivityProps): JSX.Element => {
  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={layoutClasses.main_content}
      >
        <div className={`${classes.container} ${classes.calDotComActivity}`}>
          <CalDotComScheduling
            calLink={calLink}
            calOrigin={calOrigin}
            onBookingSuccessful={onBookingSuccessful}
            hideEventTypeDetails={hideEventTypeDetails}
          />
        </div>
      </main>
      <HostedPageFooter>
        <div className={`${classes.button_wrapper} ${classes.container}`}>
          <Button
            data-cy="markMessageAsReadButton"
            variant="secondary"
            onClick={() => alert('do something')}
          >
            Next activity
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}
