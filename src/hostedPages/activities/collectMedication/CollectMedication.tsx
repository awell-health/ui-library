import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, InputField, useTheme } from '../../../atoms'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'
import classes from './collectMedication.module.scss'
import { CollectMedicationProps, type Medication } from './types'
import { isEmpty } from 'lodash'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

export const CollectMedication: FC<CollectMedicationProps> = ({
  text,
  onSubmit,
}) => {
  const [medications, setMedications] = useState<Medication[]>([])
  const { updateLayoutMode, resetLayoutMode } = useTheme()

  useEffect(() => {
    updateLayoutMode('flexible')

    return () => {
      // Reset to default mode on unmount
      resetLayoutMode()
    }
  }, [])

  const handleSubmit = useCallback(() => {
    const filteredMedications = medications.filter((medication) => {
      return (
        !isEmpty(medication.name) ||
        !isEmpty(medication.dose) ||
        !isEmpty(medication.instructions)
      )
    })

    onSubmit(filteredMedications)
  }, [medications, onsubmit])

  const addMedication = () => {
    setMedications([...medications, { name: '', dose: '', instructions: '' }])
  }

  const updateMedication = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const newMedications = [...medications]
    newMedications[index] = { ...newMedications[index], [field]: value }
    setMedications(newMedications)
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  return (
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={layoutClasses.main_content}
      >
        <div
          className={`${classes.container} ${classes.groupMedsListContainer}`}
        >
          {medications.map((medication, index) => (
            <div className={classes.singleMedsListContainer} key={index}>
              <InputField
                id="name"
                label={text.medication_name}
                type="text"
                value={medication.name}
                onChange={(e) =>
                  updateMedication(index, 'name', e.target.value)
                }
                placeholder={text.medication_name}
              />
              <InputField
                id="dose"
                label={text.medication_dose}
                type="text"
                value={medication.dose}
                onChange={(e) =>
                  updateMedication(index, 'dose', e.target.value)
                }
                placeholder={text.medication_dose}
              />
              <InputField
                id="instructions"
                label={text.medication_instructions}
                type="text"
                value={medication.instructions || ''}
                onChange={(e) =>
                  updateMedication(index, 'instructions', e.target.value)
                }
                placeholder={text.medication_instructions}
              />
              <button
                onClick={() => removeMedication(index)}
                type="button"
                className={classes.deleteMedsButton}
              >
                <MinusCircleIcon className={classes.icon} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
        <div className={`${classes.container} ${classes.addMedsButton}`}>
          <Button onClick={addMedication} variant="secondary">
            {text.add_medication_button}
          </Button>
        </div>
      </main>

      <HostedPageFooter showScrollHint={false}>
        <div className={`${classes.button_wrapper} ${classes.container}`}>
          <Button
            data-cy="submitMedication"
            variant="primary"
            onClick={handleSubmit}
          >
            {text.submit_medication}
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}

CollectMedication.displayName = 'CollectMedication'
