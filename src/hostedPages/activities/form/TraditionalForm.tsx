import React from 'react'
import { Button, CircularSpinner, Text } from '../../../atoms'
import classes from './form.module.scss'
import { Question } from '../../../molecules'
import { useTraditionalForm } from '../../../hooks/useForm'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'
import { FormProps } from '../../../types/form'
import { UserQuestionType } from '../../../types'

export const TraditionalForm = ({
  form,
  onSubmit,
  buttonLabels,
  evaluateDisplayConditions,
  errorLabels,
  storedAnswers,
  onAnswersChange,
  autosaveAnswers = true,
}: FormProps) => {
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

  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={`${layoutClasses.main_content} ${classes.traditional_form}`}
      >
        <div className={`${classes.container}`}>
          {!questionWithVisiblity ? (
            <div className={classes.loadingContainer}>
              <CircularSpinner size="sm" />
            </div>
          ) : (
            <div>
              <div>
                {questionWithVisiblity
                  .filter((vb) => vb.visible)
                  .map((visibleQuestion) => (
                    <div
                      key={visibleQuestion.id}
                      className={`${classes.traditional_form_question} ${
                        visibleQuestion.userQuestionType ===
                        UserQuestionType.Slider
                          ? classes.traditional_form_question_slider
                          : ''
                      }`}
                    >
                      <Question
                        question={visibleQuestion}
                        control={control}
                        getValues={getValues}
                        key={visibleQuestion.id}
                        errors={errors}
                        inputAutoFocus={false}
                        onAnswerChange={updateQuestionVisibility}
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
          <div className={`${classes.button_wrapper}`}>
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
        </div>
      </main>
    </>
  )
}
