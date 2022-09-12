import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  convertToAwellInput,
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
}: FormSettingsContextProps): FormSettingsContextInterface => {
  const formMethods = useForm({
    defaultValues: getInitialValues(questions),
    shouldUnregister: false,
    shouldFocusError: true,
    mode: 'all',
  })
  const [visibleQuestions, setVisibleQuestions] = useState<
    Array<QuestionWithVisibility>
  >([])
  const [errors, setErrors] = useState<Array<FormError>>([])
  const [current, setCurrent] = useState(-1)

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
    updateQuestionVisibility()
  }, [updateQuestionVisibility])

  const handleCheckForErrors = (): boolean => {
    const currentQuestion = visibleQuestions?.[current]
    const errorsWithoutCurrent = errors.filter(
      (err) => err.id !== currentQuestion?.id
    )

    setErrors(errorsWithoutCurrent)
    if (currentQuestion?.userQuestionType === UserQuestionType.Description) {
      return false
    }
    const isNotModified =
      !formMethods.formState.dirtyFields[currentQuestion?.id]

    if (
      currentQuestion?.questionConfig?.mandatory &&
      (isEmpty(formMethods.getValues(currentQuestion.id)) || isNotModified)
    ) {
      const errorsWithoutCurrent = errors.filter(
        (err) => err.id !== currentQuestion.id
      )
      setErrors([
        ...errorsWithoutCurrent,
        { id: currentQuestion.id, error: errorLabels.required },
      ])

      return true
    }
    return false
  }
  const handleGoToNextQuestion = async () => {
    await updateQuestionVisibility().finally(() => {
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
    errors,
    isFirstQuestion: current === 0,
    isLastQuestion: current === visibleQuestions.length - 1,
    isEntryPage: current === -1,
  }
}

export { useWizardForm }
