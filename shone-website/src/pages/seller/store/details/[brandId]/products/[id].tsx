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
  useAddSkuMutation,
  useAddVariantMutation,
  useGetProductLazyQuery,
  useUpdateProductMutation,
  useUpdateSkuMutation,
  useUpdateVariantMutation,
  Variant,
} from '../../../../../../generated/graphql'

export default function AddEditProductPage() {
  const [selectedVariant, setSelectedVariant] = useState<number>()
  const [selectedSku, setSelectedSku] = useState<number>()
  const router = useRouter()
  const { id, brandId }: { id?: string; brandId?: string } = router.query

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({ reValidateMode: 'onChange', mode: 'onChange' })

  const isNewProduct = id === 'new'
  const isNewVariant = selectedVariant === -1
  const isNewSku = selectedSku === -1

  const [addProduct, addProductResponse] = useAddProductMutation()
  const [addVariant, addVariantResponse] = useAddVariantMutation()
  const [addSku, addSkuResponse] = useAddSkuMutation()
  const [updateProduct, updateProductResponse] = useUpdateProductMutation()
  const [updateVariant, updateVariantResponse] = useUpdateVariantMutation()
  const [updateSku, updateSkuResponse] = useUpdateSkuMutation()
  const [
    getProduct,
    { data: productData, loading: loadingGetProduct },
  ] = useGetProductLazyQuery({ fetchPolicy: 'no-cache' })

  const loading =
    addProductResponse.loading ||
    addVariantResponse.loading ||
    addSkuResponse.loading ||
    updateProductResponse.loading ||
    updateVariantResponse.loading ||
    updateSkuResponse.loading ||
    loadingGetProduct

  useEffect(() => {
    if (!isNewProduct && id)
      getProduct({
        variables: { productId: id },
      })
  }, [id])

  useEffect(() => {
    if (productData && selectedVariant === undefined) {
      reset({
        name: productData.product.name,
        description: productData.product.description,
      })
    }
  }, [productData, selectedVariant])

  const addEditVariant = async (product) => {
    const variant = isNewVariant
      ? product.variantData
      : {
          id: productData.product.variants[selectedVariant].id,
          ...product.variantData,
        }
    await (isNewVariant ? addVariant : updateVariant)({
      variables: {
        ...variant,
        productId: id,
      },
    })
    setSelectedVariant(undefined)
  }

  const addEditSku = async (product) => {
    const sku = isNewSku
      ? product.variantData.skuData
      : {
          id:
            productData.product.variants[selectedVariant].skus[selectedSku].id,
          ...product.variantData.skuData,
        }

    await (isNewSku ? addSku : updateSku)({
      variables: {
        ...sku,
        variantId: productData.product.variants[selectedVariant].id,
      },
    })
    setSelectedSku(undefined)
  }

  const addEditProduct = async (newProduct) => {
    const product = isNewProduct ? newProduct : { id: id, ...newProduct }

    await (isNewProduct ? addProduct : updateProduct)({
      variables: {
        ...product,
        brandId,
      },
    })
    setSelectedVariant(undefined)
  }

  const onSubmit = async (newProduct) => {
    try {
      if (selectedVariant !== undefined && selectedSku === undefined) {
        await addEditVariant(newProduct)
      } else if (selectedSku !== undefined) {
        await addEditSku(newProduct)
      } else {
        await addEditProduct(newProduct)
      }
      if (id)
        getProduct({
          variables: { productId: id },
        })
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
        {(isNewProduct || selectedVariant === undefined) && (
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
        {selectedVariant === undefined && !isNewProduct && (
          <FormButton disabled={loading}>Edit</FormButton>
        )}
        {!isNewProduct && productData?.product && (
          <div className="flex flex-col items-center">
            {selectedVariant !== undefined && (
              <>
                <div className="text-2xl capitalize">
                  {productData.product.name}
                </div>
                <div className="text-lg">{productData.product.description}</div>
              </>
            )}
            {selectedVariant === undefined && (
              <Table
                rows={productData.product.variants || []}
                tableTitle="Variants"
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
        {(isNewProduct || selectedVariant !== undefined) && (
          <VariantForm
            cancelEdit={() => setSelectedVariant(undefined)}
            variant={
              selectedVariant >= 0 &&
              (productData?.product?.variants[selectedVariant] as Variant)
            }
            isNewVariant={isNewVariant}
            isNewProduct={isNewProduct}
            register={register}
            errors={errors}
            reset={reset}
            selectedSku={selectedSku}
            setSelectedSku={setSelectedSku}
          />
        )}
        {selectedVariant === undefined && isNewProduct && (
          <FormButton disabled={loading}>Create</FormButton>
        )}
      </form>
    </div>
  )
}
