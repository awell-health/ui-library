import React, { useEffect } from 'react'

interface useClickOutsideNotifierProps {
  ref: React.Ref<HTMLElement>
  clickOutsideHandler: () => void
}

/**
 * Hook that notifies about clicks outside of the passed ref
 */
export const useClickOutsideNotifier = ({
  ref,
  clickOutsideHandler,
}: useClickOutsideNotifierProps): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //@ts-ignore
      if (ref?.current && !ref?.current.contains(event.target)) {
        clickOutsideHandler()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, clickOutsideHandler])
}
