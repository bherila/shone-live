import React from 'react'
interface props {
  children?: any
  fullWidth?: any
  props?: any
  onClick?: any
}
const CustomButton = ({ children, fullWidth, onClick, ...props }: props) => {
  return (
    <>
      <button
        {...props}
        onClick={onClick}
        className={`p-3 bg-yellow text-lg font-bold rounded-xl h-14 relative ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        {children}
      </button>
    </>
  )
}

export default CustomButton
