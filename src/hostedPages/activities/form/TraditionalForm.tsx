import React, { useEffect } from 'react'
import { Button, Text } from '../../../atoms'
import classes from './form.module.scss'
import { Question } from '../../../molecules'
import { useTraditionalForm } from '../../../hooks/useForm'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'
import { FormProps } from '../../../types/form'
import { UserQuestionType } from '../../../types'
import { useTheme } from '../../../atoms/themeProvider/ThemeProvider'
import {
  LoadActivityPlaceholder,
  HostedPageFooter,
} from '../../layouts/HostedPageLayout'

export const TraditionalForm = ({
  form,
  onSubmit,
  buttonLabels,
  evaluateDisplayConditions,
  errorLabels,
  storedAnswers,
  onAnswersChange,
  autosaveAnswers = true,
  questionLabels,
}: FormProps) => {
  const { updateLayoutMode, resetLayoutMode } = useTheme()

  const {
    updateQuestionVisibility,
    submitForm,
    isSubmittingForm,
    formMethods: { control, getValues },
    errors,
    questionWithVisiblity,
    formHasErrors,
  } = useTraditionalForm({
    questions: form.questions,
    onSubmit,
    evaluateDisplayConditions,
    errorLabels,
    storedAnswers,
    autosaveAnswers,
    onAnswersChange,
  })

  useEffect(() => {
    updateLayoutMode('flexible')

    return () => {
      // Reset to default mode on unmount
      resetLayoutMode()
    }
  }, [])

  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={`${layoutClasses.main_content} ${classes.traditional_form}`}
      >
        <div
          className={`${classes.container} ${classes.traditional_container}`}
        >
          {!questionWithVisiblity ? (
            <div className={classes.loadingContainer}>
              <LoadActivityPlaceholder />
            </div>
          ) : (
            <div>
              <div>
                {questionWithVisiblity
                  .filter((vb) => vb.visible)
                  .map((visibleQuestion) => (
                    <div
                      key={visibleQuestion.id}
                      className={classes.traditional_form_question}
                    >
                      <Question
                        question={visibleQuestion}
                        control={control}
                        getValues={getValues}
                        key={visibleQuestion.id}
                        errors={errors}
                        inputAutoFocus={false}
                        onAnswerChange={updateQuestionVisibility}
                        labels={questionLabels}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
          {form?.trademark && (
            <div className={`${classes.trademark} ${classes.conversational}`}>
              {form.trademark}
            </div>
          )}
        </div>
      </main>
      <HostedPageFooter showScrollHint={false}>
        <div className={`${classes.traditional_button_wrapper}`}>
          {formHasErrors && (
            <div>
              <Text variant="textSmall" color="var(--awell-signalError100)">
                {errorLabels.formHasErrors}
              </Text>
            </div>
          )}
          <div></div>
          <Button
            onClick={submitForm}
            type="submit"
            data-cy="submitFormButton"
            disabled={isSubmittingForm}
          >
            {buttonLabels.submit}
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}
