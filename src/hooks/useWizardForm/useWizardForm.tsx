import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useValidate } from '../useValidate'
import {
  calculatePercentageCompleted,
  convertToAwellInput,
  convertToFormFormat,
  getInitialValues,
  isEmpty,
  updateVisibility,
} from './helpers'
import {
  AnswerValue,
  FormSettingsContextInterface,
  FormSettingsContextProps,
  FormError,
  UserQuestionType,
  QuestionWithVisibility,
} from './types'

const useWizardForm = ({
  questions,
  evaluateDisplayConditions,
  onSubmit,
  errorLabels,
  storedAnswers,
  onAnswersChange,
}: FormSettingsContextProps): FormSettingsContextInterface => {
  const initialValues = convertToFormFormat(storedAnswers, questions)
  const { isPossibleE164Number } = useValidate()
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
  }, [current])

  useEffect(() => {
    updateQuestionVisibility()
  }, [updateQuestionVisibility])

  const handleCheckForErrors = (): boolean => {
    const currentQuestion = visibleQuestions?.[current]
    const errorsWithoutCurrent = errors.filter(
      (err) => err.id !== currentQuestion?.id
    )

    setErrors(errorsWithoutCurrent)

    /**
     * Description question types can't have validation errors
     */
    if (currentQuestion?.userQuestionType === UserQuestionType.Description) {
      return false
    }

    if (currentQuestion?.userQuestionType === UserQuestionType.Telephone) {
      const value = formMethods.getValues(currentQuestion.id)
      const isE164Number = isPossibleE164Number(value as string)

      if (!isE164Number) {
        const errorLabel = errorLabels.invalidPhoneNumber

        setErrors([
          ...errorsWithoutCurrent,
          { id: currentQuestion.id, error: errorLabel },
        ])

        return true
      }
    }

    if (
      currentQuestion?.questionConfig?.mandatory &&
      isEmpty(formMethods.getValues(currentQuestion.id))
    ) {
      const errorsWithoutCurrent = errors.filter(
        (err) => err.id !== currentQuestion.id
      )

      const errorLabel = errorLabels.required

      setErrors([
        ...errorsWithoutCurrent,
        { id: currentQuestion.id, error: errorLabel },
      ])

      return true
    }
    return false
  }

  const handleGoToNextQuestion = async () => {
    await updateQuestionVisibility().then((updatedQuestions) => {
      // check if there are no new visible questions after evaluating rules
      const doNextQuestionExist = current !== updatedQuestions.length - 1
      if (!doNextQuestionExist) {
        // check if there are any errors
        const hasErrors = handleCheckForErrors()
        // if there are no errors, submit the form
        if (!hasErrors) {
          formMethods.handleSubmit(handleConvertAndSubmitForm)()
        }
        return
      }
      const hasErrors = handleCheckForErrors()

      if (!hasErrors) {
        setCurrent(current + 1)
      }
    })
    if (current === -1) {
      setCurrent(current + 1)
    }
  }

  const handleGoToPrevQuestion = () => {
    setCurrent(current - 1)
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
      // check if there are any errors
      const hasErrors = handleCheckForErrors()
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

export { useWizardForm }
