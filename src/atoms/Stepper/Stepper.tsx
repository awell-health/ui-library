import { FC } from 'react'
import classes from './Stepper.module.scss'

export type StepperProps = {
  steps: {
    id: string
    name: string
    status: 'complete' | 'current' | 'upcoming'
    href: string
  }[]
  onStepClick: (stepId: string) => void
}

export const Stepper: FC<StepperProps> = ({ steps, onStepClick }) => {
  return (
    <nav aria-label="Progress">
      <ol className={classes.progress}>
        {steps.map((step) => (
          <li key={step.name}>
            <a
              href={step.href}
              className={
                step.status === 'complete'
                  ? classes.complete
                  : step.status === 'current'
                  ? classes.current
                  : classes.incomplete
              }
              onClick={(e) => {
                if (step.status === 'upcoming') {
                  e.preventDefault()
                } else {
                  e.preventDefault()
                  onStepClick(step.id)
                }
              }}
              aria-disabled={step.status === 'upcoming'}
            >
              <span className={classes.step_id}>{step.id}</span>
              <span className={classes.step_name}>{step.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
