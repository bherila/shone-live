import Lottie from 'lottie-react'
import React from 'react'

import animationData from './shone-lottie-animation-black.json'

export default function AnimatedLogo(): JSX.Element {
  return (
    <Lottie
      animationData={animationData}
      loop={false}
      autoPlay={true}
      width={300}
      height={100}
    />
  )
}
