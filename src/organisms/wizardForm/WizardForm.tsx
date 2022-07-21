import React, { FC, MouseEventHandler, useState } from 'react'
import { Text, HeadingMain } from '../../atoms/typography'
import { Button } from '../../atoms/button'
import classes from './wizardForm.module.scss'
import { useForm } from 'react-hook-form'
import { Question } from '../../molecules/question/Question'
import { QuestionType } from '../../types'

export interface WizardFormProps {
  form: any
}
export type AnswerValue = string | number | number[]

export const getDefaultValue = (question: any): AnswerValue => {
  switch (question.userQuestionType) {
    case QuestionType.MultipleSelect:
      return []
    case QuestionType.Slider:
      return question.questionConfig?.slider?.min ?? 0
    default:
      return ''
  }
}
export const WizardForm: FC<WizardFormProps> = ({ form }) => {
  const xyz = form.questions.reduce((obj: any, item: { id: any }) => {
    return {
      ...obj,
      [item.id]: getDefaultValue(item),
    }
  }, {})
  const { control, getValues } = useForm({
    defaultValues: xyz,
    shouldUnregister: false,
    shouldFocusError: true,
    mode: 'onBlur',
  })
  console.log(form.questions)
  const [current, setCurrent] = useState(0)
  const handleGoToNext = () => {
    setCurrent(current + 1)
  }
  const handleGoToPrev = () => {
    setCurrent(current - 1)
  }
  console.log('get val', getValues())
  const isLastQuestion = current === form.questions.length - 1
  return (
    <div className={classes.awell_wizard_form}>
      <div className={classes.title}>
        <HeadingMain variant="subHeadline">{form.title}</HeadingMain>
      </div>

        <div className={classes.wizard_form}>
          <Question
              question={form.questions[current]}
              control={control}
              getValues={getValues}
              key={form.questions[current].id}
          />
        </div>
        <div className={classes.button_wrapper}>
          <div>
            {current !== 0 && (
                <Button variant='tertiary' onClick={() => handleGoToPrev()}>Prev</Button>
            )}
          </div>
          {isLastQuestion ? (
              <Button onClick={() => null}>Submit</Button>
          ) : (
              <Button variant='secondary' onClick={() => handleGoToNext()}>Next</Button>
          )}
        </div>

    </div>
  )
}
