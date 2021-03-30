import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export default function useInput<T>({
  label,
  defaultValue,
  name,
  validate,
  type,
}: {
  label?: string
  defaultValue?: T
  name: string
  validate?: (inputValue) => boolean
  type?: string
}) {
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

  return {
    valid,
    value,
    setValue,
    // eslint-disable-next-line react/display-name
    render: () => (
      <TextField
        onChange={handleChange}
        id={name}
        type={type}
        label={label || name}
        variant="outlined"
        value={value}
      />
    ),
  }
}
