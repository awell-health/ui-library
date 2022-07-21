import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnswerValue } from '../../organisms/wizardForm/WizardForm'
import { convertToAwellInput, getDefaultValue, getInitialValues, updateVisibility } from '../../organisms/wizardForm/helpers'
import { FormSettingsContextInterface, QuestionRuleResult } from './types'


const initialSettingsContext = {
  onFormChange: () => null,
  resetQuestion: () => null,
  resetForm: () => null,
  submitForm: () => null,
  formMethods: null,
}

const FormSettingsContext = createContext<any>(
  initialSettingsContext,
)

const WizardFromContextProvider = ({
                                       children,
                                       questions, answers, evaluateDisplayConditions, onSubmit
                                     }:FormSettingsContextInterface): JSX.Element => {

  const formMethods = useForm({
    defaultValues: getInitialValues(questions),
    shouldUnregister: false,
    shouldFocusError: true,
    mode: 'all',

  })
  const [visibleQuestions, setVisibleQuestions] = useState<Array<any>>([])
  const [readyForSubmit, setReadyForSubmit] = useState(true)
  const [errors, setErrors] = useState([])

  const updateQuestionVisibility = useCallback(async () => {
    const formValuesInput = convertToAwellInput(formMethods.getValues())
    const answersInput = (answers || []).map(({ question_id, value }) => ({
      question_id,
      value,
    }))
    const evaluateInput = !formValuesInput ? answersInput : formValuesInput
    const evaluationResults = await evaluateDisplayConditions(evaluateInput)
    const updatedQuestions = updateVisibility(questions, evaluationResults).filter(e => e.visible)
    setVisibleQuestions(updatedQuestions)
  }, [answers, evaluateDisplayConditions])

  const handleFormChange = async () => {
    setReadyForSubmit(false)
    await updateQuestionVisibility()
  }

  const resetQuestion = (question: any) => {
    const defaultValue = getDefaultValue(question)
    formMethods.setValue(question.id, defaultValue, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const resetForm = () => {
    formMethods.reset()
  }

  const submitForm = () => {
    setErrors([])
    formMethods.handleSubmit(
      async (formResponse: Record<string, AnswerValue>) => {
        await onSubmit(convertToAwellInput(formResponse))
      },
    )()
  }

  useEffect(() => {
    updateQuestionVisibility()
  }, [answers])

  return (
    <FormSettingsContext.Provider value={{
      formMethods,
      resetQuestion,
      onFormChange: handleFormChange,
      resetForm,
      submitForm,
      visibleQuestions,
      readyForSubmit,
      errors
    }}>
      {children}
    </FormSettingsContext.Provider>
  )
}

const useWizardForm = (): FormSettingsContextInterface =>
  useContext(FormSettingsContext)

export { WizardFromContextProvider, useWizardForm }
