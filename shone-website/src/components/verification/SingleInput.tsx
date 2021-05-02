/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@material-ui/core'
import React, { memo, useRef, useLayoutEffect, useEffect } from 'react'

function usePrevious<T>(value?: T) {
  const ref = useRef<T>()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const prevFocus = usePrevious(!!focus)
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  // return <Input ref={inputRef} {...rest} />;
  return <input ref={inputRef} {...rest} />
}

const SingleOTPInput = memo(SingleOTPInputComponent)
export default SingleOTPInput
