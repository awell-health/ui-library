import React from 'react'
import './App.css'
import { form } from './fixtures'
import { WizardForm as WizardFormComponent } from './organisms/wizardForm'
import { Navbar } from './molecules/navbar'

function App() {
  return (
    <>
      <Navbar />
      <WizardFormComponent form={form} />
    </>
  )
}

export default App
