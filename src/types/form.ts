import { Question } from './question'

export type Form = {
  id: string
  questions: Array<Question>
  title: string
  key: string
}

export type FormError = { id: string; error: string }
