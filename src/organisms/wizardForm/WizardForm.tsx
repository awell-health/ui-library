import React from 'react'
import { HeadingMain } from '../../atoms/typography'
import { Button } from '../../atoms/button'
import classes from './wizardForm.module.scss'
import { Question } from '../../molecules/question'
import { useWizardForm } from '../../hooks/useWizardForm'
import {
  AnswerInput,
  QuestionRuleResult,
} from '../../hooks/useWizardForm/types'

export interface WizardFormProps {
  form: any
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => void
}
export type AnswerValue = string | number | number[]

export const WizardForm = ({
  form,
  onSubmit,
  evaluateDisplayConditions,
}: WizardFormProps) => {
  const {
    updateQuestionVisibility,
    submitForm,
    handleGoToNextQuestion,
    handleGoToPrevQuestion,
    handleFormChange,
    formMethods: { control, getValues },
    currentQuestion,
    currentError,
    isFirstQuestion,
    isLastQuestion,
    isEntryPage,
  } = useWizardForm({
    questions: form.questions,
    onSubmit,
    evaluateDisplayConditions,
  })

  if (isEntryPage) {
    return (
      <div className={classes.awell_wizard_form}>
        <div className={classes.title}>
          <HeadingMain variant="subHeadline">{form.title}</HeadingMain>
          <Button onClick={handleGoToNextQuestion}>Start form</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.awell_wizard_form}>
      <>
        <div className={classes.wizard_form}>
          <Question
            question={currentQuestion}
            control={control}
            getValues={getValues}
            key={currentQuestion.id}
            error={currentError}
          />
        </div>
        <div className={classes.button_wrapper}>
          <div>
            {!isFirstQuestion && (
              <Button variant="tertiary" onClick={handleGoToPrevQuestion}>
                Prev
              </Button>
            )}
          </div>
          {isLastQuestion ? (
            <Button onClick={submitForm} type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleGoToNextQuestion}>
              Next
            </Button>
          )}
        </div>
      </>
    </div>
  )
}
