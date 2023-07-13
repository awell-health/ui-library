import React from 'react'
import { Button, CircularSpinner } from '../../../atoms'
import classes from './form.module.scss'
import { Question } from '../../../molecules'
import { useWizardForm } from '../../../hooks/useWizardForm'
import { WizardFormProps } from '../../../types'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'

export const TraditionalForm = ({
  form,
  onSubmit,
  buttonLabels,
  evaluateDisplayConditions,
  errorLabels,
  questionTypeConfig = {},
  storedAnswers,
  onAnswersChange,
}: WizardFormProps) => {
  const {
    submitForm,
    formMethods: { control, getValues },
    errors,
    isEvaluatingQuestionVisibility,
  } = useWizardForm({
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
        className={`${layoutClasses.main_content} traditional_form`}
        style={{ marginBottom: 0 }}
      >
        <div className={`${classes.container}`}>
          {isEvaluatingQuestionVisibility ? (
            <div className={classes.loadingContainer}>
              <CircularSpinner size="sm" />
            </div>
          ) : (
            <div>
              <div className="flex flex-col space-y-8">
                {form.questions.map((visibleQuestion) => (
                  <div
                    key={visibleQuestion.id}
                    className="row mb-4"
                    style={{ marginBottom: 60 }}
                  >
                    <Question
                      question={visibleQuestion}
                      control={control}
                      getValues={getValues}
                      key={visibleQuestion.id}
                      errors={errors}
                      inputAutoFocus={false}
                      questionTypeConfig={questionTypeConfig}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {!isEvaluatingQuestionVisibility && (
            <div className="traditional-form-button-container">
              <Button
                onClick={submitForm}
                type="submit"
                data-cy="submitFormButton"
                className="right-aligned-button"
              >
                {buttonLabels.submit}
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
