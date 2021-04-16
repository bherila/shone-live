import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../components/Input'
import Select from '../../components/Select'
import {
  useAddProductMutation,
  useGetProductLazyQuery,
  useGetShowsQuery,
} from '../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function ProductsPage() {
  const router = useRouter()
  const { id }: { id?: string } = router.query

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({ reValidateMode: 'onChange', mode: 'onChange' })

  const { data } = useGetShowsQuery()

  const [addProduct, { loading }] = useAddProductMutation()
  const [getProduct, { data: productData }] = useGetProductLazyQuery()

  useEffect(() => {
    if (id !== 'new')
      getProduct({
        variables: { productId: +id },
      })
  }, [id])

  useEffect(() => {
    if (productData && data) {
      reset({
        name: productData.product.name,
        description: productData.product.description,
        showId: productData.product.show.id,
      })
    }
  }, [data, productData])

  const onSubmit = async (newProduct) => {
    try {
      console.log(newProduct)
      await addProduct({
        variables: {
          ...newProduct,
          showId: newProduct.showId * 1,
        },
      })
      router.push('/products')
    } catch (e) {
      console.log(e)
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
        <Select
          label="Show Id"
          name="showId"
          register={register}
          registerOptions={{ required: true }}
          error={errors.showId && 'is required'}
        >
          {data?.shows.map((show) => (
            <option key={show.id} value={show.id}>
              {show.title}
            </option>
          ))}
        </Select>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {id === 'new' ? 'Create' : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  )
}
