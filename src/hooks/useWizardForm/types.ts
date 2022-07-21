import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { QuestionType } from '../../types'
import { AnswerValue } from '../../organisms/wizardForm/WizardForm'

export enum DataPointValueType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  NumbersArray = 'NUMBERS_ARRAY',
  String = 'STRING'
}
export type AnswerInput = {
  question_id: string;
  value: string;
};
export type Answer = {
  __typename?: 'Answer';
  question_id: string;
  value: string;
  value_type: DataPointValueType;
};
export type QuestionRuleResult = {
  __typename?: 'QuestionRuleResult';
  question_id: string;
  rule_id: string;
  satisfied: boolean;
};

export interface FormSettingsContextInterface {
  children: React.ReactNode
  answers?: Array<Answer>
  evaluateDisplayConditions: (
    response: Array<AnswerInput>,
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => Promise<void>
  questions: Array<any>
}