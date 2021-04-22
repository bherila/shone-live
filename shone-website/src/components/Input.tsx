import React from 'react'
import { RegisterOptions } from 'react-hook-form'

export default function Input({
  label,
  placeholder,
  name,
  register,
  registerOptions,
  error,
}: {
  label: string
  placeholder?: string
  name: string
  register: any
  registerOptions?: RegisterOptions
  error?: any
}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        placeholder={placeholder || label}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error && 'border-red-500'
        }`}
        {...register(name, registerOptions)}
      />
      {error && <p className="text-red-500 pl-1 text-xs italic">{error}</p>}
    </div>
  )
}
