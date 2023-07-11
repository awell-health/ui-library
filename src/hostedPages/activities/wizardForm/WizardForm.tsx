import React, { useEffect } from 'react'
import { Button, ProgressIndicator, CircularSpinner } from '../../../atoms'
import classes from './wizardForm.module.scss'
import { Question } from '../../../molecules'
import { useWizardForm } from '../../../hooks/useWizardForm'
import { WizardFormProps } from '../../../types'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import { useScrollHint } from '../../../hooks/useScrollHint'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'

export const WizardForm = ({
  form,
  onSubmit,
  buttonLabels,
  evaluateDisplayConditions,
  errorLabels,
  questionLabels,
  questionTypeConfig = {},
  storedAnswers,
  onAnswersChange,
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
    storedAnswers,
    onAnswersChange,
  })

  const { showScrollHint, determineShowScrollHint } = useScrollHint()

  /**
   * For certain questions like Single Select or Boolean questions,
   * we don't want the user to click on the answer first and then
   * on the 'next' button. Instead, we just submit the answer when
   * user clicks on one of the options and move to the next question.
   */
  const submitAndMoveToNextQuestion = () => {
    if (!isLastQuestion) {
      console.log('MOVING TO NEXT QUESTION')
      handleGoToNextQuestion()
    }
  }

  useEffect(() => {
    determineShowScrollHint()
  }, [currentQuestion])

  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={layoutClasses.main_content}
      >
        <div className={`${classes.awell_wizard_form} ${classes.container}`}>
          <div className={classes.form_progress}>
            <ProgressIndicator percentageCompleted={percentageCompleted} />
          </div>
          {isEvaluatingQuestionVisibility ? (
            <div className={classes.loadingContainer}>
              <CircularSpinner size="sm" />
            </div>
          ) : (
            <div className={classes.wizard_form}>
              <Question
                question={currentQuestion}
                control={control}
                getValues={getValues}
                key={currentQuestion.id}
                errors={errors}
                labels={questionLabels}
                questionTypeConfig={questionTypeConfig}
                submitAndMoveToNextQuestion={submitAndMoveToNextQuestion}
              />
            </div>
          )}
        </div>
      </main>
      <HostedPageFooter showScrollHint={showScrollHint}>
        {!isEvaluatingQuestionVisibility && (
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
        )}
      </HostedPageFooter>
    </>
  )
}
