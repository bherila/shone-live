import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../../../../../components/Input'
import Select from '../../../../../../components/Select'
import {
  useAddProductMutation,
  useGetMyBrandsQuery,
  useGetProductLazyQuery,
  useUpdateProductMutation,
} from '../../../../../../generated/graphql'

export default function AddEditProductPage() {
  const router = useRouter()
  const { id, brandId }: { id?: string; brandId?: string } = router.query

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({ reValidateMode: 'onChange', mode: 'onChange' })

  const { data } = useGetMyBrandsQuery({
    variables: { limit: 10, offset: 0 },
  })
  const isNew = id === 'new'

  const [addProduct, { loading: loadingAddProduct }] = useAddProductMutation()
  const [updateProduct, { loading: loadingUpdate }] = useUpdateProductMutation()
  const [
    getProduct,
    { data: productData, loading: loadingGetProduct },
  ] = useGetProductLazyQuery()

  const loading = loadingAddProduct || loadingUpdate || loadingGetProduct

  useEffect(() => {
    if (!isNew)
      getProduct({
        variables: { productId: id },
      })
  }, [id])

  useEffect(() => {
    if (productData && data) {
      reset({
        name: productData.product.name,
        description: productData.product.description,
      })
    }
  }, [data, productData])

  const onSubmit = async (newProduct) => {
    try {
      const product = isNew ? newProduct : { id: id, ...newProduct }

      await (isNew ? addProduct : updateProduct)({
        variables: {
          ...product,
          brandId,
        },
      })
      router.push('/products')
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
        {isNew && (
          <Select
            label="Brand Id"
            name="brandId"
            register={register}
            registerOptions={{ required: true }}
            error={errors.brandId && 'is required'}
          >
            <option className="text-gray-200" value="" />
            {data?.my_brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Select>
        )}
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
