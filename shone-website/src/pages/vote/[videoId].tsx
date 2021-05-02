import React, { useState } from 'react'
import VideoComponent from '../../components/vote/VideoComponent'
import UserInformation from '../../components/vote/UserInformation'
import VerificationPage from '../../components/vote/VerificationPage'

interface Props {
  hasReadPermission?: boolean
}

export const Vote = ({ hasReadPermission }: Props): JSX.Element => {
  const [step, setStep] = useState(1)

  return (
    <>
      <VideoComponent />
    </>
  )
}

export default Vote
