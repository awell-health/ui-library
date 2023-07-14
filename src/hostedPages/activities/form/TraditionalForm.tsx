import React from 'react'
import { Button, CircularSpinner } from '../../../atoms'
import classes from './form.module.scss'
import { Question } from '../../../molecules'
import { useWizardForm } from '../../../hooks/useWizardForm'
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
  // TODO: this form should use its own hook since it has a different behaviour of Conversational Form
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
        className={`${layoutClasses.main_content} ${classes.traditional_form}`}
      >
        <div className={`${classes.container}`}>
          {isEvaluatingQuestionVisibility ? (
            <div className={classes.loadingContainer}>
              <CircularSpinner size="sm" />
            </div>
          ) : (
            <div>
              <div>
                {form.questions.map((visibleQuestion) => (
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
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="traditional-form-button-container">
            <Button
              disabled={isEvaluatingQuestionVisibility}
              onClick={submitForm}
              type="submit"
              data-cy="submitFormButton"
              className="right-aligned-button"
            >
              {buttonLabels.submit}
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
