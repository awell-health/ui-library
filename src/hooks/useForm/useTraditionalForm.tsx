/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useValidate } from '../useValidate'
import {
  convertToAwellInput,
  convertToFormFormat,
  getDirtyFieldValues,
  getDefaultValue,
  getErrorsForQuestion,
  getInitialValues,
  isEmpty,
  markInitialValuesAsDirty,
  updateVisibilityForTraditionalForm,
} from './helpers'
import {
  AnswerValue,
  FormError,
  FormSettingsContextProps,
  QuestionWithVisibility,
  TraditionalFormContext,
} from './types'

const useTraditionalForm = ({
  questions,
  evaluateDisplayConditions,
  onSubmit,
  errorLabels,
  storedAnswers,
  autosaveAnswers = true,
  onAnswersChange,
}: FormSettingsContextProps): TraditionalFormContext => {
  const initialValues = convertToFormFormat(storedAnswers, questions)

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
  const [formHasErrors, setFormHasErrors] = useState<boolean>(false)
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false)

  const {
    isValidE164Number,
    validateDateResponse,
    validateNumberResponse,
    validateEmailResponse,
    validateAttachmentsResponse,
    validateInputValidationResponse,
  } = useValidate()

  const updateQuestionVisibility = useCallback(async () => {
    let questionsWithVisibility: Array<QuestionWithVisibility> = []

    for (let attempt = 0; attempt <= questions.length; attempt += 1) {
      const formValuesInput = convertToAwellInput(
        getDirtyFieldValues(formMethods)
      )
      const evaluationResults = await evaluateDisplayConditions(formValuesInput)
      questionsWithVisibility = updateVisibilityForTraditionalForm(
        questions,
        evaluationResults
      )

      const didResetHiddenAnswer = questionsWithVisibility
        .filter((question) => !question.visible)
        .reduce((didReset, question) => {
          const defaultValue = getDefaultValue(question)
          const currentValue = formMethods.getValues(question.id)
          const fieldState = formMethods.getFieldState(question.id)
          const hasNonDefaultValue =
            JSON.stringify(currentValue) !== JSON.stringify(defaultValue)

          if (
            !fieldState.isDirty &&
            !fieldState.isTouched &&
            !hasNonDefaultValue
          ) {
            return didReset
          }

          formMethods.resetField(question.id, { defaultValue })
          return true
        }, false)

      if (!didResetHiddenAnswer) {
        break
      }
    }

    const updatedQuestions = questionsWithVisibility.filter((e) => e.visible)
    setVisibleQuestions(updatedQuestions)

    return updatedQuestions
  }, [JSON.stringify(questions)])

  useEffect(() => {
    // If the form is not dirty or we don't autosave, we don't need to update the stored answers
    if (
      !formMethods.formState.isDirty ||
      !onAnswersChange ||
      !autosaveAnswers
    ) {
      return
    }
    onAnswersChange(JSON.stringify(formMethods.getValues()) ?? '{}')
  }, [formMethods.watch()])

  useEffect(() => {
    updateQuestionVisibility()
  }, [updateQuestionVisibility])

  // Mark all initial values as dirty
  useEffect(() => {
    if (autosaveAnswers && !isEmpty(initialValues)) {
      markInitialValuesAsDirty({
        formMethods,
        initialValues,
        defaultValues: getInitialValues(questions),
      })
      formMethods.trigger().then(() => {
        // Ensure validation is completed before updating visibility
        const allValues = formMethods.getValues()
        if (onAnswersChange) {
          onAnswersChange(JSON.stringify(allValues) ?? '{}')
        }
        updateQuestionVisibility()
      })
    }
  }, [])

  const handleConvertAndSubmitForm = async (
    formResponse: Record<string, AnswerValue>
  ) => {
    if (isSubmittingForm) {
      return
    }
    setIsSubmittingForm(true)
    try {
      await onSubmit(convertToAwellInput(formResponse))
    } catch (error) {
      console.error('Form submission failed:', error)
      setFormHasErrors(true)
    } finally {
      setIsSubmittingForm(false)
    }
  }

  const submitForm = async () => {
    let currentVisibleQuestions = visibleQuestions
    try {
      currentVisibleQuestions = await updateQuestionVisibility()
    } catch (error) {
      console.error('Failed to evaluate display conditions:', error)
      setFormHasErrors(true)
      return
    }

    const formErrors = currentVisibleQuestions.flatMap((vq) =>
      getErrorsForQuestion(
        vq,
        formMethods,
        errorLabels,
        isValidE164Number,
        validateDateResponse,
        validateNumberResponse,
        validateEmailResponse,
        validateAttachmentsResponse,
        validateInputValidationResponse
      )
    )
    setErrors(formErrors)
    if (formErrors.length === 0) {
      setFormHasErrors(false)
      formMethods.handleSubmit(handleConvertAndSubmitForm, (rhfErrors) => {
        console.error('Form validation errors:', rhfErrors)
        setFormHasErrors(true)
      })()
    } else {
      setFormHasErrors(true)
    }
  }

  return {
    updateQuestionVisibility,
    submitForm,
    isSubmittingForm,
    formMethods,
    errors,
    questionWithVisiblity: visibleQuestions,
    formHasErrors,
  }
}

export { useTraditionalForm }
