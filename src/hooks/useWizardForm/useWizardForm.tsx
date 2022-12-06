import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  calculatePercentageCompleted,
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
  const [current, setCurrent] = useState(0)
  const [isEvaluatingQuestionVisibility, setIsEvaluatingQuestionVisibility] =
    useState(true)
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

    /**
     * See https://awellhealth.atlassian.net/browse/AST-4048
     * Sliders are the only question type that have a default value which
     * allows the user to press "next" and navigate to the next question even
     * when they didn't touch the slider. However, when a slider question is required
     * we want to make sure the user touches the slider to set a value.
     */
    let isSliderQuestionNotTouched = false

    if (currentQuestion.userQuestionType === UserQuestionType.Slider) {
      isSliderQuestionNotTouched =
        !formMethods.formState.dirtyFields[currentQuestion?.id]
    }

    if (
      currentQuestion?.questionConfig?.mandatory &&
      (isEmpty(formMethods.getValues(currentQuestion.id)) ||
        isSliderQuestionNotTouched)
    ) {
      const errorsWithoutCurrent = errors.filter(
        (err) => err.id !== currentQuestion.id
      )

      const errorLabel = isSliderQuestionNotTouched
        ? errorLabels.sliderNotTouched
        : errorLabels.required

      setErrors([
        ...errorsWithoutCurrent,
        { id: currentQuestion.id, error: errorLabel },
      ])

      return true
    }
    return false
  }

  const handleGoToNextQuestion = async () => {
    await updateQuestionVisibility().finally(() => {
      const hasErrors = handleCheckForErrors()
      console.log(hasErrors)
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
