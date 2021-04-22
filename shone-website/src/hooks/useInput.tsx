import { TextField } from '@material-ui/core'
import React, { ReactElement, useEffect, useState } from 'react'

export default function useInput<T>({
  className,
  defaultValue,
  label,
  name,
  type,
  validate,
}: {
  label?: string
  defaultValue?: T
  name?: string
  validate?: (inputValue) => boolean
  type?: string
  className?: string
}): [T, () => ReactElement, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(defaultValue)
  const [valid, setValid] = useState(true)

  const handleChange = (ev) => {
    setValue(ev.target.value)
  }

  useEffect(() => {
    if (validate) {
      setValid(validate(value))
    }
  }, [value])

  return [
    value,
    () => (
      <div className={className || 'my-2 w-full'}>
        <TextField
          className="w-full"
          onChange={handleChange}
          id={name}
          type={type}
          label={label || name}
          variant="outlined"
          value={value}
        />
      </div>
    ),
    setValue,
    valid,
  ]
}
