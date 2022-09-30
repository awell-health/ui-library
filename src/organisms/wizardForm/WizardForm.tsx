import React from 'react'
import { HeadingMain, Button, ProgressIndicator } from '../../atoms'
import classes from './wizardForm.module.scss'
import { Question } from '../../molecules'
import { useWizardForm } from '../../hooks/useWizardForm'
import { WizardFormProps } from './types'

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
    isEntryPage,
  } = useWizardForm({
    questions: form.questions,
    onSubmit,
    evaluateDisplayConditions,
    errorLabels,
  })

  if (isEntryPage) {
    return (
      <div className={classes.awell_wizard_form}>
        <div className={classes.title}>
          <HeadingMain variant="subHeadline">{form.title}</HeadingMain>
          <Button onClick={handleGoToNextQuestion}>{buttonLabels.start_form}</Button>
        </div>
      </div>
    )
  }
  return (
    <div className={classes.awell_wizard_form}>
      <>
        <div className={classes.form_progress}>
          <ProgressIndicator percentageCompleted={percentageCompleted} />
        </div>
        <div className={classes.wizard_form}>
          <Question
            question={currentQuestion}
            control={control}
            getValues={getValues}
            key={currentQuestion.id}
            errors={errors}
          />
        </div>
        <div className={classes.button_wrapper}>
          <div>
            {!isFirstQuestion && (
              <Button variant="tertiary" onClick={handleGoToPrevQuestion}>
                {buttonLabels.prev}
              </Button>
            )}
          </div>
          {isLastQuestion ? (
            <Button onClick={submitForm} type="submit">
              {buttonLabels.submit}
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleGoToNextQuestion}>
              {buttonLabels.next}
            </Button>
          )}
        </div>
      </>
    </div>
  )
}
