import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useValidate } from '../useValidate'
import {
  convertToAwellInput,
  convertToFormFormat,
  getErrorsForQuestion,
  getInitialValues,
  isEmpty,
  updateVisibility,
} from './helpers'
import {
  AnswerValue,
  FormSettingsContextProps,
  FormError,
  QuestionWithVisibility,
  TraditionalFormContext,
} from './types'

const useTraditionalForm = ({
  questions,
  evaluateDisplayConditions,
  onSubmit,
  errorLabels,
  storedAnswers,
  onAnswersChange,
}: FormSettingsContextProps): TraditionalFormContext => {
  const initialValues = convertToFormFormat(storedAnswers, questions)
  const formMethods = useForm({
    defaultValues: isEmpty(initialValues)
      ? getInitialValues(questions)
      : initialValues,
    shouldUnregister: false,
    shouldFocusError: true,
    mode: 'all',
  })
  const [visibleQuestions, setVisibleQuestions] = useState<
    Array<QuestionWithVisibility>
  >([])
  const [errors, setErrors] = useState<Array<FormError>>([])
  const [formHasErrors, setFormHasErrors] = useState<boolean>(false)

  const { isValidE164Number } = useValidate()

  const updateQuestionVisibility = useCallback(async () => {
    const formValuesInput = convertToAwellInput(formMethods.getValues())
    const evaluationResults = await evaluateDisplayConditions(formValuesInput)
    const updatedQuestions = updateVisibility(
      questions,
      evaluationResults
    ).filter((e) => e.visible)
    setVisibleQuestions(updatedQuestions)

    return updatedQuestions
  }, [questions])

  useEffect(() => {
    // If the form is not dirty, we don't need to update the stored answers
    if (!formMethods.formState.isDirty || !onAnswersChange) {
      return
    }
    onAnswersChange(JSON.stringify(formMethods.getValues()) ?? '{}')
  }, [formMethods.watch()])

  useEffect(() => {
    updateQuestionVisibility()
  }, [updateQuestionVisibility])

  const handleConvertAndSubmitForm = async (
    formResponse: Record<string, AnswerValue>
  ) => {
    await onSubmit(convertToAwellInput(formResponse))
  }

  const submitForm = async () => {
    await updateQuestionVisibility()
    const errors = visibleQuestions.flatMap((vq) =>
      getErrorsForQuestion(vq, formMethods, errorLabels, isValidE164Number)
    )
    setErrors(errors)
    if (errors.length == 0) {
      setFormHasErrors(false)
      formMethods.handleSubmit(handleConvertAndSubmitForm)()
    } else {
      setFormHasErrors(true)
    }
  }

  return {
    updateQuestionVisibility,
    submitForm,
    formMethods,
    errors,
    questionWithVisiblity: visibleQuestions,
    formHasErrors,
  }
}

export { useTraditionalForm }