import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useValidate } from '../useValidate'
import {
  calculatePercentageCompleted,
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
  ConversationalFormContext,
} from './types'

const useConversationalForm = ({
  questions,
  evaluateDisplayConditions,
  onSubmit,
  errorLabels,
  storedAnswers,
  onAnswersChange,
}: FormSettingsContextProps): ConversationalFormContext => {
  const initialValues = convertToFormFormat(storedAnswers, questions)
  const { isValidE164Number } = useValidate()
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
  const [current, setCurrent] = useState(0)
  const [isEvaluatingQuestionVisibility, setIsEvaluatingQuestionVisibility] =
    useState<boolean>(true)
  const [percentageCompleted, setPercentageCompleted] = useState(0)

  const updateQuestionVisibility = useCallback(async () => {
    setIsEvaluatingQuestionVisibility(true)
    const formValuesInput = convertToAwellInput(formMethods.getValues())
    const evaluationResults = await evaluateDisplayConditions(formValuesInput)
    const updatedQuestions = updateVisibility(
      questions,
      evaluationResults
    ).filter((e) => e.visible)
    setVisibleQuestions(updatedQuestions)
    setIsEvaluatingQuestionVisibility(false)

    return updatedQuestions
  }, [questions])

  useEffect(() => {
    // If the form is not dirty, we don't need to update the stored answers
    if (!formMethods.formState.isDirty || !onAnswersChange) {
      return
    }
    onAnswersChange(JSON.stringify(formMethods.getValues()) ?? '{}')
  }, [formMethods.watch()])

  /**
   * Compute percentage completed of the form every
   * time we navigate between questions.
   */
  useEffect(() => {
    const percentageCompletedTemp = calculatePercentageCompleted({
      currentQuestionId: visibleQuestions?.[current]?.id || '',
      allQuestions: questions,
    })

    setPercentageCompleted(percentageCompletedTemp)
  }, [current, visibleQuestions])

  useEffect(() => {
    updateQuestionVisibility()
  }, [updateQuestionVisibility])

  const handleCheckForErrors = (
    currentQuestion: QuestionWithVisibility
  ): boolean => {
    const errorsWithoutCurrent = errors.filter(
      (err) => err.id !== currentQuestion?.id
    )
    const existingErrors = getErrorsForQuestion(
      currentQuestion,
      formMethods,
      errorLabels,
      isValidE164Number
    )
    setErrors([...errorsWithoutCurrent, ...existingErrors])
    return errors.length > 0
  }

  const handleGoToNextQuestion = async () => {
    const hasErrors = handleCheckForErrors(visibleQuestions?.[current])
    if (!hasErrors) {
      try {
        const updatedQuestions = await updateQuestionVisibility()
        const isLastVisibleQuestion = current === updatedQuestions.length - 1
        if (isLastVisibleQuestion) {
          formMethods.handleSubmit(handleConvertAndSubmitForm)()
          return
        }
      } finally {
        setCurrent(current + 1)
      }
    }
    if (current === -1) {
      setCurrent(current + 1)
    }
  }

  const handleGoToPrevQuestion = async () => {
    const isFirstVisibleQuestion = current === 0
    try {
      await updateQuestionVisibility()
      if (isFirstVisibleQuestion) {
        return
      }
    } finally {
      if (!isFirstVisibleQuestion) {
        setCurrent(current - 1)
      }
    }
  }

  const handleConvertAndSubmitForm = async (
    formResponse: Record<string, AnswerValue>
  ) => {
    await onSubmit(convertToAwellInput(formResponse))
  }

  const submitForm = async () => {
    await updateQuestionVisibility().then((updatedQuestions) => {
      // check if there are new visible questions after evaluating rules
      const doNextQuestionExist = current !== updatedQuestions.length - 1
      if (doNextQuestionExist) {
        return handleGoToNextQuestion()
      }

      const hasErrors = handleCheckForErrors(visibleQuestions?.[current])
      if (!hasErrors) {
        formMethods.handleSubmit(handleConvertAndSubmitForm)()
      }
    })
  }

  return {
    updateQuestionVisibility,
    submitForm,
    handleGoToNextQuestion,
    handleGoToPrevQuestion,
    formMethods,
    currentQuestion: visibleQuestions?.[current],
    percentageCompleted,
    errors,
    isFirstQuestion: current === 0,
    isLastQuestion: current === visibleQuestions.length - 1,
    isEvaluatingQuestionVisibility,
  }
}

export { useConversationalForm }
