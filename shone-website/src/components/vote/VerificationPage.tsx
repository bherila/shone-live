import React from 'react'
import Image from 'next/image'
import OTPInput from '../verification'
import { Button, Input } from '@material-ui/core'
import CustomButton from '../CommonComponents/CustomButton'

const VerificationPage = ({ setStep }): JSX.Element => {
  return (
    <>
      <div className="px-4 pt-6 min-h-screen flex flex-col">
        <div className="relative z-50" onClick={() => setStep(1)}>
          <img src="/back.svg" alt="back" />
        </div>
        <div className="text-center -mt-2">
          <h2 className="text-black font-bold text-2xl mb-3">Verification</h2>
          <span className="text-gray text-sm mb-3 w-4/5 table mx-auto leading-6">
            To complete your request, enter the verification code we sent to
            *****32
          </span>
        </div>
        <div>
          <OTPInput
            autoFocus
            isNumberInput
            length={6}
            className="flex justify-between	w-full mb-6 pt-4"
            inputClassName="p-3 bg-gray focus:outline-none border border-solid border-gray rounded-xl text-sm w-12 h-16 text-center"
            onChangeOTP={(otp) => console.log('Number OTP: ', otp)}
          />
        </div>
        <CustomButton fullWidth onClick={() => setStep(4)}>
          Next{' '}
          <img
            src="/ellipse.svg"
            className="absolute right-4 top-4 pointer-events-none"
            alt="ellipse"
          />
        </CustomButton>
        <div className="text-center mt-4 text-black text-sm">
          Send code again <span className="text-gray">00:45</span>
        </div>
      </div>
    </>
  )
}

export default VerificationPage
