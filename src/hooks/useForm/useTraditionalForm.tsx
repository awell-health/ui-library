/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useValidate } from '../useValidate'
import {
  convertToAwellInput,
  convertToFormFormat,
  getDirtyFieldValues,
  getErrorsForQuestion,
  getInitialValues,
  isEmpty,
  markInitialValuesAsDirty,
  updateVisibility,
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
  } = useValidate()

  const updateQuestionVisibility = useCallback(async () => {
    const formValuesInput = convertToAwellInput(
      getDirtyFieldValues(formMethods)
    )
    const evaluationResults = await evaluateDisplayConditions(formValuesInput)
    const updatedQuestions = updateVisibility(
      questions,
      evaluationResults
    ).filter((e) => e.visible)
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
    await onSubmit(convertToAwellInput(formResponse))
    setIsSubmittingForm(false)
  }

  const submitForm = async () => {
    await updateQuestionVisibility()
    const formErrors = visibleQuestions.flatMap((vq) =>
      getErrorsForQuestion(
        vq,
        formMethods,
        errorLabels,
        isValidE164Number,
        validateDateResponse,
        validateNumberResponse,
        validateEmailResponse
      )
    )
    setErrors(formErrors)
    if (formErrors.length === 0) {
      setFormHasErrors(false)
      formMethods.handleSubmit(handleConvertAndSubmitForm)()
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
