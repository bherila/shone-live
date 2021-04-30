import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa'

import FormButton from '../../../../../../components/FormButton'
import Input from '../../../../../../components/Input'
import Table from '../../../../../../components/Table'
import VariantForm from '../../../../../../components/VariantForm'
import {
  useAddProductMutation,
  useGetProductLazyQuery,
  useUpdateProductMutation,
} from '../../../../../../generated/graphql'

export default function AddEditProductPage() {
  const [selectedVariant, setSelectedVariant] = useState<number>()
  const router = useRouter()
  const { id, brandId }: { id?: string; brandId?: string } = router.query

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({ reValidateMode: 'onChange', mode: 'onChange' })

  const isNewProduct = id === 'new'

  const [addProduct, { loading: loadingAddProduct }] = useAddProductMutation()
  const [updateProduct, { loading: loadingUpdate }] = useUpdateProductMutation()
  const [
    getProduct,
    { data: productData, loading: loadingGetProduct },
  ] = useGetProductLazyQuery()

  const loading = loadingAddProduct || loadingUpdate || loadingGetProduct

  useEffect(() => {
    if (!isNewProduct)
      getProduct({
        variables: { productId: id },
      })
  }, [id])

  useEffect(() => {
    if (productData) {
      reset({
        name: productData.product.name,
        description: productData.product.description,
      })
    }
  }, [productData])

  const onSubmit = async (newProduct) => {
    try {
      const product = isNewProduct ? newProduct : { id: id, ...newProduct }

      await (isNewProduct ? addProduct : updateProduct)({
        variables: {
          ...product,
          brandId,
        },
      })
      router.push(`/seller/store/details/${brandId}/products/`)
    } catch (e) {
      console.error(e)
    }
  }

  const selectVariant = (e, row) => {
    e.stopPropagation()
    setSelectedVariant(
      productData.product.variants.findIndex(({ id }) => id === row.id),
    )
    reset({
      variantData: row,
    })
  }

  const onAddVariantClick = () => {
    setSelectedVariant(-1)
    reset({
      variantData: {},
    })
  }

  return (
    <div className="w-full flex flex-col items-center">
      <FaArrowLeft
        onClick={() =>
          router.push(`/seller/store/details/${brandId}/products/`)
        }
        className="hover:text-blue-700 self-start text-blue-500 font-bold m-8 absolute"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-4/12 shadow-md rounded px-8 pt-6 pb-8 my-4"
      >
        {!isNewProduct && productData?.product && (
          <div className="flex flex-col items-center">
            <div className="text-2xl capitalize">
              {productData.product.name}
            </div>
            <div className="text-lg">{productData.product.description}</div>
            {selectedVariant === undefined && (
              <Table
                rows={productData.product.variants || []}
                columns={[
                  {
                    title: 'Name',
                    field: 'name',
                  },
                  {
                    title: 'Skus',
                    field: 'skus',
                    renderField: (row) =>
                      row.skus?.map(({ name }) => name).join(', '),
                  },
                  {
                    title: 'Actions',
                    renderField: (row) => (
                      <FaPencilAlt
                        onClick={(e) => selectVariant(e, row)}
                        size={20}
                      />
                    ),
                    field: 'actions',
                  },
                ]}
                bottomActions={[
                  {
                    handleClick: onAddVariantClick,
                    name: 'Add Variant',
                  },
                ]}
                rowId="id"
                tableWidth="100%"
                styleProps={{ height: 300 }}
              />
            )}
          </div>
        )}
        {isNewProduct && (
          <>
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
          </>
        )}
        {(isNewProduct || selectedVariant !== undefined) && (
          <VariantForm
            cancelEdit={() => setSelectedVariant(undefined)}
            variant={
              selectedVariant >= 0 &&
              productData?.product?.variants[selectedVariant]
            }
            isNewVariant={selectedVariant === -1}
            isNewProduct={isNewProduct}
            register={register}
            errors={errors}
            reset={reset}
          />
        )}
        {selectedVariant === undefined && (
          <FormButton disabled={loading}>
            {isNewProduct ? 'Create' : 'Edit'}
          </FormButton>
        )}
      </form>
    </div>
  )
}
