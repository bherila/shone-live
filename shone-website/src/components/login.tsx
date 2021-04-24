import { Grid, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
  useAddUserMutation,
  useUpdateUserMutation,
  useVerifyCodeLazyQuery,
} from '../generated/graphql'

interface LoginPageProps {
  redirectPath: string
}

const Login = ({ redirectPath }: LoginPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [addUser, { loading: loadingAddUser }] = useAddUserMutation()

  const [
    updateUser,
    { data: updatedUser, loading: loadingUpdateUser },
  ] = useUpdateUserMutation()

  const [
    verifyCode,
    { data: verify, loading: loadingVerifyCode, error: errorVerifying },
  ] = useVerifyCodeLazyQuery()

  const [step, setStep] = useState(1)

  const handleAddUser = async (phone) => {
    try {
      await addUser({
        variables: {
          phone,
        },
      })
      setStep(2)
    } catch (error) {
      console.error(error)
    }
  }

  const handleVerifyCode = ({ code, phone }) => {
    console.log('phone', phone)
    verifyCode({
      variables: {
        code,
        phone,
      },
    })
  }

  const handleUpdateUser = ({ username, email }) => {
    updateUser({
      variables: {
        user: { id: verify.verify_code.id, email, username },
      },
    })
  }

  useEffect(() => {
    if (verify?.verify_code?.token) {
      localStorage.setItem('token', verify.verify_code.token)
      window.location.href = redirectPath ?? '/seller'
    } else if (verify) {
      setStep(3)
    }
  }, [verify])

  useEffect(() => {
    if (updatedUser) {
      localStorage.setItem('token', updatedUser.update_user.token)
      window.location.href = redirectPath ?? '/seller'
    }
  }, [updatedUser])

  const onSubmit = (data) => {
    if (step === 1) {
      handleAddUser(data.phone)
    } else if (step === 2) {
      handleVerifyCode(data)
    } else {
      handleUpdateUser(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Grid container alignItems="center" direction="column" spacing={3}>
        <Grid item />
        <Grid xs={2} container item direction="column">
          {step === 1 && (
            <>
              <TextField
                variant="outlined"
                label="Phone"
                {...register('phone', {
                  required: true,
                })}
              />
              {errors['phone'] && 'error'}
            </>
          )}
          {step === 2 && (
            <>
              <TextField
                variant="outlined"
                label="Code"
                {...register('code', { required: true, maxLength: 6 })}
              />
              {errors['code'] && 'error'}
            </>
          )}
          {step === 3 && (
            <>
              <TextField
                variant="outlined"
                label="Username"
                {...register('username', { required: true })}
              />
              {errors['username'] && 'error'}
              <TextField
                variant="outlined"
                label="Mail"
                {...register('mail', { required: true })}
              />
              {errors['mail'] && 'error'}
            </>
          )}
        </Grid>
        <Grid item>
          <button
            type="submit"
            className="mt-3 bg-green-400 text-white p-2 font-bold rounded hover:bg-green-600"
            disabled={loadingAddUser || loadingVerifyCode || loadingUpdateUser}
          >
            {step === 1 ? 'Send' : 'Verify'}
          </button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Login
