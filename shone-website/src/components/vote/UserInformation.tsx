import React from 'react'
import CustomTextField from '../CommonComponents/CustomTextField'
import CustomButton from '../CommonComponents/CustomButton'

const UserInformation = ({ setStep, prizeData }): JSX.Element => {
  return (
    <>
      <div className="px-4 pt-6 min-h-screen flex flex-col">
        <div className="flex-auto">
          <div className="float-right" onClick={() => setStep(1)}>
            <img src="/close.svg" alt="close" />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-black font-bold text-2xl mb-3">
              To win these prizes
            </h2>
            <span className="text-gray text-sm mb-10 block">
              Thank you for voting
            </span>
          </div>
          <div className="flex flex-wrap -mx-3 mb-10">
            {prizeData.map((prize) => (
              <div className="w-1/3 px-3">
                <div className="bg-gray p-2 rounded-2xl text-center">
                  <img src={prize.image} />
                  <span className="text-gray text-sm">{prize.prize}</span>
                </div>
              </div>
            ))}
          </div>
          <span className="text-center text-gray text-sm block">
            Enter your phone number below
          </span>

          <div className="mt-8">
            <CustomTextField type="number" placeholder="Enter phone number" />
          </div>
          <div className="mt-8">
            <CustomButton fullWidth onClick={() => setStep(3)}>
              Submit{' '}
              <img
                src="/ellipse.svg"
                className="absolute right-4 top-4 pointer-events-none"
                alt="ellipse"
              />
            </CustomButton>
          </div>
        </div>
        <div className="mt-3 p-10">
          <span className="text-center text-sm block text-gray">
            By signing up you accept the{' '}
            <a href="#" className="text-black">
              Terms of Service
            </a>{' '}
            <a href="#" className="text-black">
              and Privacy Policy.
            </a>
          </span>
        </div>
      </div>
    </>
  )
}

export default UserInformation
