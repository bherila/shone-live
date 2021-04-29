import React, { useEffect } from 'react'
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa'

import { Variant } from '../generated/graphql'
import FormButton from './FormButton'
import Input from './Input'
import SkuForm from './SkuForm'
import Table from './Table'

export default function VariantForm({
  cancelEdit,
  errors,
  isNewProduct,
  isNewVariant,
  register,
  reset,
  variant,
  selectedSku,
  setSelectedSku,
}: {
  cancelEdit: () => void
  errors: DeepMap<FieldValues, FieldError>
  isNewProduct: boolean
  isNewVariant: boolean
  register: UseFormRegister<FieldValues>
  reset: UseFormReset<FieldValues>
  variant: Variant
  selectedSku: number
  setSelectedSku: (val: number) => void
}) {
  useEffect(() => {
    if (variant && selectedSku === undefined) {
      reset({
        variantData: variant,
      })
    }
  }, [selectedSku])

  const selectSku = (e, row) => {
    e.stopPropagation()
    setSelectedSku(variant.skus.findIndex(({ id }) => id === row.id))
    reset({
      variantData: {
        skuData: row,
      },
    })
  }

  const onAddSkuClick = () => {
    setSelectedSku(-1)
    reset({
      variantData: {
        skuData: {},
      },
    })
  }

  return (
    <>
      {!isNewProduct && selectedSku === undefined && (
        <FaArrowLeft
          onClick={cancelEdit}
          className="hover:text-blue-700 text-blue-500 font-bold my-2"
        />
      )}
      {selectedSku !== undefined ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl capitalize">{variant.name}</div>
          <div className="text-lg">{variant.description}</div>
        </div>
      ) : (
        <>
          <Input
            label="Variant Name"
            name="variantData.name"
            register={register}
            registerOptions={{ required: true }}
            error={errors.name && 'is required'}
          />
          <Input
            label="Variant Description"
            name="variantData.description"
            register={register}
            registerOptions={{ required: true }}
            error={errors.name && 'is required'}
          />
        </>
      )}
      {selectedSku === undefined && !isNewProduct && !isNewVariant && (
        <FormButton>Edit</FormButton>
      )}
      {variant && selectedSku === undefined && (
        <div className="flex flex-col items-center">
          <Table
            rows={variant.skus || []}
            tableTitle="Skus"
            columns={[
              {
                title: 'Name',
                field: 'name',
              },
              {
                title: 'Friendly Name',
                field: 'friendlyName',
              },
              {
                title: 'COGS',
                field: 'COGS',
              },
              {
                title: 'Stock',
                field: 'stock',
              },
              {
                title: 'Actions',
                renderField: (row) => (
                  <FaPencilAlt onClick={(e) => selectSku(e, row)} size={20} />
                ),
                field: 'actions',
              },
            ]}
            bottomActions={[
              {
                handleClick: onAddSkuClick,
                name: 'Add Sku',
              },
            ]}
            rowId="id"
            tableWidth="100%"
            styleProps={{ height: 300 }}
          />
        </div>
      )}
      {(isNewProduct || selectedSku !== undefined || isNewVariant) && (
        <SkuForm
          selectedSku={selectedSku}
          cancelEdit={() => setSelectedSku(undefined)}
          isNewProduct={isNewProduct}
          isNewVariant={isNewVariant}
          register={register}
          errors={errors}
        />
      )}
      {selectedSku === undefined && !isNewProduct && isNewVariant && (
        <FormButton>Add Variant</FormButton>
      )}
    </>
  )
}
