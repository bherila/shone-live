import React from 'react'
interface props {
  setStep?: (int) => void
  totalPoints?: any
  invites?: any
}

const ScoreComponent = ({
  setStep,
  totalPoints,
  invites,
}: props): JSX.Element => {
  return (
    <>
      <div className="fixed top-0 z-50 right-0 left-0 p-3">
        <div className="flex justify-between w-full items-center">
          <div
            className="bg-gray border border-solid border-gray w-14 h-14 flex items-center justify-center rounded-full"
            onClick={() => setStep(1)}
          >
            <img src="/back.svg" alt="back" />
          </div>
          <div className="px-3 w-40">
            <img src="/shone-log-black.svg" alt="" />
          </div>
          <div className="bg-yellow w-14 h-14 flex items-center justify-center rounded-full">
            <img src="/invite-user.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="pt-20 px-4 min-h-screen flex flex-col">
        <div className="flex-auto">
          <h3 className="text-gray text-sm mb-6 w-4/5 table mx-auto leading-6 text-center">
            Get one point for each vote <br />
            and 10 points for each friend who joins
          </h3>
          <ul className="border border-solid border-gray rounded-2xl py-3">
            {Object.entries(totalPoints).map((point, index) => (
              <li className="flex px-4 py-2 justify-between items-center">
                <span className="text-gray text-sm">{point[0]}</span>
                <span
                  className={`text-black font-bold ${
                    index === 0 ? 'text-2xl' : 'text-lg'
                  }`}
                >
                  {point[1]}{' '}
                  <sub className="text-gray font-normal text-sm bottom-0">
                    pts
                  </sub>
                </span>
              </li>
            ))}
            <li></li>
          </ul>
          <div className="mt-6">
            <div className="text-gray font-light">
              Invites{' '}
              <span className="text-black text-lg font-bold">
                {invites.length}
              </span>
            </div>
            <ul>
              {invites.map((data, index) => (
                <li className="flex py-2 justify-between items-center">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <img
                        className="mr-3 w-10 h-10 object-cover"
                        src="/invite-user.png"
                        alt=""
                      />
                      <span className="text-black text-sm font-bold">
                        {data.name}
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2 text-right">
                    <span className="flex justify-end">
                      <label className="custom-checkbox">
                        <input className="hidden" type="checkbox" />
                        <span className="w-5 h-5 block rounded-full border-2 border-solid border-gray"></span>
                      </label>
                      <div className="ml-3 w-20">
                        <span className="text-black font-bold text-sm bottom-0">
                          {data.points}{' '}
                          <sub className="text-gray font-normal text-sm bottom-0">
                            pts
                          </sub>
                        </span>
                      </div>
                    </span>
                  </div>
                </li>
              ))}
              <li></li>
            </ul>
          </div>
        </div>
        <div className="w-full py-5">
          <span className="text-center text-sm block text-gray w-4/5 table mx-auto">
            Download the app to keep voting to get{' '}
            <span className="text-black">100 points</span> and{' '}
            <span className="text-black">$5 credit</span>
          </span>
          <div className="px-3 flex justify-center mt-4">
            <img className="rounded mx-2" src="/google-play.svg" alt="" />
            <img
              className="rounded mx-2"
              src="/available-on-the-app-store.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ScoreComponent
