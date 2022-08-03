import React, { useEffect } from 'react'

interface useClickOutsideNotifierProps {
  ref: React.RefObject<HTMLElement>
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
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
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
