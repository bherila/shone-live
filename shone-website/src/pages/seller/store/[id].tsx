import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../../components/Input'
import {
  useAddBrandMutation,
  useGetBrandLazyQuery,
  useUpdateBrandMutation,
} from '../../../generated/graphql'

export default function BrandsPage() {
  const router = useRouter()
  const { id }: { id?: string } = router.query

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({ reValidateMode: 'onChange', mode: 'onChange' })

  const isNew = id === 'new'

  const [addBrand, { loading: loadingAddBrand }] = useAddBrandMutation()
  const [updateBrand, { loading: loadingUpdate }] = useUpdateBrandMutation()
  const [
    getBrand,
    { data: brandData, loading: loadingGetBrand },
  ] = useGetBrandLazyQuery()

  const loading = loadingAddBrand || loadingUpdate || loadingGetBrand

  useEffect(() => {
    if (!isNew)
      getBrand({
        variables: { brandId: id },
      })
  }, [id])

  useEffect(() => {
    if (brandData) {
      reset({
        name: brandData.brand.name,
        description: brandData.brand.description,
      })
    }
  }, [brandData])

  const onSubmit = async (newBrand) => {
    try {
      const brand = isNew ? newBrand : { id: id, ...newBrand }

      await (isNew ? addBrand : updateBrand)({
        variables: {
          ...brand,
          brandId: newBrand.brandId,
        },
      })
      router.push('/seller')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-4/12 shadow-md rounded px-8 pt-6 pb-8 my-4"
      >
        <Input
          label="Name"
          name="name"
          register={register}
          registerOptions={{ required: true }}
          error={errors.name && 'is required'}
        />
        <Input
          label="Description"
          name="description"
          register={register}
          registerOptions={{ required: true }}
          error={errors.description && 'is required'}
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {isNew ? 'Create' : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  )
}
