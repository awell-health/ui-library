export type Medication = {
  name: string
  dose: string
  instructions?: string
}

export interface CollectMedicationProps {
  onSubmit: (data: Medication[]) => void
  text: {
    medication_name: string
    medication_dose: string
    medication_instructions: string
    add_medication_button: string
    submit_medication: string
  }
}
