import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { TypingCaret, WithTypingCaret, Button } from '../../atoms'
import { AvaGPTProps } from './types'
import classes from './avaGPT.scss'
import { isEmpty, isNil } from 'lodash'

export const AvaGPT = ({
  open,
  state,
  onSubmit,
  prompt,
  answer,
  promptPlaceholder,
  onPromptChange,
  buttonLabel,
}: AvaGPTProps) => {
  const [isOpen, setIsOpen] = useState(open)
  const [promptValue, setPromptValue] = useState(prompt)

  const containerRef = useRef<HTMLDivElement>(null)
  const answerContainerRef = useRef<HTMLDivElement>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault()

      if (!isNil(promptValue) && !isEmpty(promptValue)) {
        onSubmit(promptValue)
      }
    },
    [onSubmit, promptValue]
  )

  const handlePromptChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setPromptValue(event.target.value)
      onPromptChange(event.target.value)
    },
    [setPromptValue, onPromptChange]
  )

  useEffect(() => {
    if (!containerRef.current || !answerContainerRef.current) {
      return
    }

    const childRect = answerContainerRef.current.getBoundingClientRect()
    containerRef.current.scrollTop = childRect.bottom
  }, [answer])

  const toggleAvaGPT = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }, [])

  return (
    <>
      {isOpen && (
        <div className={classes.chatContainerWrapper}>
          <div className={classes.chatWindow}>
            <div ref={containerRef} className={classes.answerContainer}>
              {state === 'preload' && <TypingCaret />}
              <div className={classes.answerContent}>
                {(state === 'streaming-answer' || state === 'done') && (
                  <div
                    className={
                      state === 'streaming-answer'
                        ? classes.answerLoading
                        : classes.answerDone
                    }
                  >
                    <ReactMarkdown
                      components={{
                        p: (props) => (
                          <WithTypingCaret Component="p" {...props} />
                        ),
                        span: (props) => (
                          <WithTypingCaret Component="span" {...props} />
                        ),
                        h1: (props) => (
                          <WithTypingCaret Component="h1" {...props} />
                        ),
                        h2: (props) => (
                          <WithTypingCaret Component="h2" {...props} />
                        ),
                        h3: (props) => (
                          <WithTypingCaret Component="h3" {...props} />
                        ),
                        h4: (props) => (
                          <WithTypingCaret Component="h4" {...props} />
                        ),
                        h5: (props) => (
                          <WithTypingCaret Component="h5" {...props} />
                        ),
                        h6: (props) => (
                          <WithTypingCaret Component="h6" {...props} />
                        ),
                        li: (props) => (
                          <WithTypingCaret Component="li" {...props} />
                        ),
                        pre: (props) => (
                          <WithTypingCaret Component="pre" {...props} />
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                    >
                      {answer}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              {state == 'indeterminate' && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className={classes.startIcon}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    ></path>
                  </svg>
                  <p className={classes.startText}>
                    Get instant help from Ava, <strong>A</strong>well&apos;s{' '}
                    <strong>V</strong>irtual <strong>A</strong>ssistant.
                  </p>
                </>
              )}
              <div ref={answerContainerRef} />
              <div className={classes.spacer} />
            </div>
            <div className={classes.questionContainer}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={promptPlaceholder}
                  className={classes.questionInput}
                  autoComplete="on"
                  autoCorrect="on"
                  autoCapitalize="on"
                  spellCheck="false"
                  disabled={state === 'preload' || state === 'streaming-answer'}
                  value={promptValue}
                  onChange={handlePromptChange}
                />
                <button className={classes.submitButton} type="submit">
                  {state === 'preload' || state === 'streaming-answer' ? (
                    <svg
                      className={classes.loadingIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{
                          opacity: '0.25',
                        }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        style={{
                          opacity: '0.75',
                        }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className={classes.sendIcon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className={classes.buttonContainer}>
        <Button onClick={toggleAvaGPT} color="sky">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className={classes.chatIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            ></path>
          </svg>
          {buttonLabel}
        </Button>
      </div>
    </>
  )
}
