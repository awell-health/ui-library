import React, { useState } from 'react'
import { HeadingMain } from '../../atoms/typography'
import { Button } from '../../atoms/button'
import classes from './wizardForm.module.scss'
import { useForm } from 'react-hook-form'
import { Question } from '../../molecules/question'
import { QuestionType } from '../../types'
import { getInitialValues, isEmpty } from './helpers'

export interface WizardFormProps {
  form: any
  onSubmit: () => void
}
export type AnswerValue = string | number | number[]

export const WizardForm = ({ form, onSubmit }: WizardFormProps) => {
  const { control, getValues } = useForm({
    defaultValues: getInitialValues(form.questions),
    shouldUnregister: false,
    shouldFocusError: true,
    mode: 'all',
  })

  const [current, setCurrent] = useState(-1)
  const [currentError, setCurrentError] = useState<string>('')

  /* todo move logic to hook*/
  /* FIXME react hook form seems to not validate fields properly on blur - to be investigated*/
  const handleCheckForErrors = (): boolean => {
    const currentQuestion = form.questions[current]
    setCurrentError('')
    if (currentQuestion?.userQuestionType === QuestionType.Description) {
      return false
    }
    if (
      currentQuestion?.questionConfig?.mandatory &&
      isEmpty(getValues(currentQuestion.id))
    ) {
      setCurrentError('This field is required')
      return true
    }
    return false
  }
  const handleGoToNext = () => {
    if (current === -1) {
      setCurrent(current + 1)
    }
    const hasErrors = handleCheckForErrors()
    if (!hasErrors) {
      setCurrent(current + 1)
    }
  }
  const handleGoToPrev = () => {
    setCurrent(current - 1)
  }

  if (current === -1) {
    return (
      <div className={classes.awell_wizard_form}>
        <div className={classes.title}>
          <HeadingMain variant="subHeadline">{form.title}</HeadingMain>
          <Button onClick={handleGoToNext}>Start form</Button>
        </div>
      </div>
    )
  }

  const isLastQuestion = current === form.questions.length - 1
  return (
    <div className={classes.awell_wizard_form}>
      <>
        <div className={classes.wizard_form}>
          <Question
            question={form.questions[current]}
            control={control}
            getValues={getValues}
            key={form.questions[current].id}
            error={currentError}
          />
        </div>
        <div className={classes.button_wrapper}>
          <div>
            {current !== 0 && (
              <Button variant="tertiary" onClick={handleGoToPrev}>
                Prev
              </Button>
            )}
          </div>
          {isLastQuestion ? (
            <Button onClick={onSubmit} type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleGoToNext}>
              Next
            </Button>
          )}
        </div>
      </>
    </div>
  )
}
