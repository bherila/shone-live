import React from 'react'
import { useState } from 'react'

import SellerLayout from '../../components/SellerLayout'
export default () => {
  const [mode] = useState('number')
  // const submitNumber = useCallback(() => {
  //   //TODO: Submit to backend that sends SMS & confirmation code
  //   setMode('confirm') // TODO: do this <-- if API request is successful
  // }, [setMode])
  if (mode === 'confirm') {
    return renderConfirm()
  } else {
    return renderEntry()
  }
}

function renderConfirm() {
  return (
    <SellerLayout>
      <h1>Authenticate</h1>
      <form>
        <p>
          We sent you a SMS with a 6 digit code, please enter that code to
          authenticate.
        </p>
        <label>
          Confirmation code:
          <input type={'text'} />
          <button type="submit">Submit</button>
        </label>
      </form>
    </SellerLayout>
  )
}

function renderEntry(isLoading?: boolean) {
  return (
    <SellerLayout>
      <h1>Authenticate</h1>
      <form>
        <label>
          Mobile number:
          <input type="tel" name="mobile_number" disabled={isLoading} />
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
          <p>Your mobile operator may charge a fee</p>
        </label>
      </form>
    </SellerLayout>
  )
}
