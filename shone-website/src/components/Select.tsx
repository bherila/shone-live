import React from 'react'
import { RegisterOptions } from 'react-hook-form'

export default function Select({
  children,
  label,
  placeholder,
  name,
  register,
  registerOptions,
  error,
  multiple,
  defaultValue,
}: {
  children: React.ReactNode
  label: string
  placeholder?: string
  name: string
  register: any
  registerOptions?: RegisterOptions
  error?: any
  multiple?: boolean
  defaultValue?: string | string[]
}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        multiple={multiple}
        placeholder={placeholder || label}
        className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...register(name, registerOptions)}
      >
        {children}
      </select>
      {error && <p className="text-red-500 pl-1 text-xs italic">{error}</p>}
    </div>
  )
}
