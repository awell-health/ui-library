import React, { useEffect } from 'react'
import {
  HeadingMain,
  Button,
  ProgressIndicator,
  CircularSpinner,
} from '../../../atoms'
import classes from './wizardForm.module.scss'
import { Question } from '../../../molecules'
import { useWizardForm } from '../../../hooks/useWizardForm'
import { WizardFormProps } from './types'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import { useScrollHint } from '../../../hooks/useScrollHint'

export const WizardForm = ({
  form,
  onSubmit,
  buttonLabels,
  evaluateDisplayConditions,
  errorLabels,
}: WizardFormProps) => {
  const {
    submitForm,
    handleGoToNextQuestion,
    handleGoToPrevQuestion,
    formMethods: { control, getValues },
    currentQuestion,
    percentageCompleted,
    errors,
    isFirstQuestion,
    isLastQuestion,
    isEvaluatingQuestionVisibility,
  } = useWizardForm({
    questions: form.questions,
    onSubmit,
    evaluateDisplayConditions,
    errorLabels,
  })

  const { showScrollHint, determineShowScrollHint } = useScrollHint()

  useEffect(() => {
    determineShowScrollHint()
  }, [currentQuestion])

  return (
    <div className={`${classes.awell_wizard_form} ${classes.container}`}>
      <>
        <div className={classes.form_progress}>
          <ProgressIndicator
            percentageCompleted={percentageCompleted}
            showPercentage={false}
          />
        </div>
        {isEvaluatingQuestionVisibility ? (
          <div className={classes.loadingContainer}>
            <CircularSpinner size="sm" />
          </div>
        ) : (
          <>
            <div className={classes.wizard_form}>
              <Question
                question={currentQuestion}
                control={control}
                getValues={getValues}
                key={currentQuestion.id}
                errors={errors}
              />
            </div>
            <HostedPageFooter showScrollHint={showScrollHint}>
              <div className={`${classes.button_wrapper} ${classes.container}`}>
                <div>
                  {!isFirstQuestion && (
                    <Button
                      variant="tertiary"
                      onClick={handleGoToPrevQuestion}
                      data-cy="navigateToPrevQuestionButton"
                    >
                      {buttonLabels.prev}
                    </Button>
                  )}
                </div>
                {isLastQuestion ? (
                  <Button
                    onClick={submitForm}
                    type="submit"
                    data-cy="submitFormButton"
                  >
                    {buttonLabels.submit}
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={handleGoToNextQuestion}
                    data-cy="navigateToNextQuestionButton"
                  >
                    {buttonLabels.next}
                  </Button>
                )}
              </div>
            </HostedPageFooter>
          </>
        )}
      </>
    </div>
  )
}
