import { useEffect } from 'react'

export const useOutsideClick = (elementRef, handler, attached = true) => {
  useEffect(() => {
    if (!attached) return

    const handleClick = e => {
      if (!elementRef.current) return
      
      if (attached.buttonRef && attached.buttonRef.current && attached.buttonRef.current.contains(e.target)) {
        return
      }

      if (!elementRef.current.contains(e.target)) {
        handler()
      }
    }

    // const handleClick = e => {
    //   if (!elementRef.current) return
    //   if (!elementRef.current && !attached.buttonRef.current) return
    //   if (e.target === attached.buttonRef) return
    //   if (
    //     !elementRef.current.contains(e.target) &&
    //     attached.buttonRef.current !== e.target
    //   ) {
    //     handler(false)
    //   }
    // }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [elementRef, handler, attached])
}
