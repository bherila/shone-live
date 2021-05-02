import React from 'react'

const CustomTextField = ({ ...props }) => {
  return (
    <>
      <input
        {...props}
        className="p-3 bg-gray focus:outline-none border border-solid border-gray rounded-xl text-sm w-full h-14"
      />
    </>
  )
}

export default CustomTextField
