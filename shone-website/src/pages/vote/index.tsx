import React, { useState } from 'react'

import VideoComponent from '../../components/vote/VideoComponent'
import UserInformation from '../../components/vote/UserInformation'
import VerificationPage from '../../components/vote/VerificationPage'
import ScoreComponent from '../../components/vote/ScoreComponent'

export const Vote = (): JSX.Element => {
  const [step, setStep] = useState(1)

  const [totalPoints, settotalPoints] = useState<any>({
    Total: 300,
    Voting: 200,
    Friends: 100,
  })

  const [invites, setInvites] = useState<any[]>([
    {
      name: 'Alex Turner',
      points: 0,
    },
    {
      name: 'Alex Turner',
      points: 0,
    },
    {
      name: 'Alex Turner',
      points: 10,
    },
    {
      name: 'Alex Turner',
      points: 10,
    },
    {
      name: 'Alex Turner',
      points: 10,
    },
  ])

  const prizeData = [
    {
      imageUrl: '/bag1.png',
      prize: '100$',
    },
    {
      imageUrl: '/bag2.png',
      prize: '100$',
    },
    {
      imageUrl: '/bag3.png',
      prize: '100$',
    },
  ]

  return (
    <>
      {step === 1 && <VideoComponent {...{ setStep }} />}
      {step === 2 && <UserInformation {...{ setStep, prizeData }} />}
      {step === 3 && <VerificationPage {...{ setStep }} />}
      {step === 4 && <ScoreComponent {...{ setStep, totalPoints, invites }} />}
    </>
  )
}

export default Vote
