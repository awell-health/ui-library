type State = 'indeterminate' | 'preload' | 'streaming-answer' | 'done'

export type AvaGPTProps = {
  open: boolean
  state: State
  promptPlaceholder?: string
  prompt?: string
  answer?: string
  onSubmit: (prompt: string) => void
  onPromptChange: (prompt: string) => void
  buttonLabel: string
}
