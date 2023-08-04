import React from 'react'
import { Button, CircularSpinner, Text } from '../../../atoms'
import classes from './form.module.scss'
import { Question } from '../../../molecules'
import { useTraditionalForm } from '../../../hooks/useForm'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'
import { FormProps } from '../../../types/form'

export const TraditionalForm = ({
  form,
  onSubmit,
  buttonLabels,
  evaluateDisplayConditions,
  errorLabels,
  questionTypeConfig = {},
  storedAnswers,
  onAnswersChange,
}: FormProps) => {
  const {
    updateQuestionVisibility,
    submitForm,
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
                      className={classes.traditional_form_question}
                    >
                      <Question
                        question={visibleQuestion}
                        control={control}
                        getValues={getValues}
                        key={visibleQuestion.id}
                        errors={errors}
                        inputAutoFocus={false}
                        questionTypeConfig={questionTypeConfig}
                        onAnswerChange={updateQuestionVisibility}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className={`${classes.trademark} ${classes.traditional}`}>
            {/* Replace with actual trademark with form response when back-end implementation is done */}
            © EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol
            Research Foundation. UK (English) v1.3
          </div>
          <div className={`${classes.button_wrapper}`}>
            {formHasErrors && (
              <div className={classes.error}>
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
            >
              {buttonLabels.submit}
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
