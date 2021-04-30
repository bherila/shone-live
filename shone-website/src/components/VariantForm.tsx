import React, { useState } from 'react'
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa'

import FormButton from './FormButton'
import Input from './Input'
import SkuForm from './SkuForm'
import Table from './Table'

export default function VariantForm({
  cancelEdit,
  variant,
  isNewProduct,
  isNewVariant,
  register,
  reset,
  errors,
}: any) {
  const [selectedSku, setSelectedSku] = useState<number>()

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
      {variant && selectedSku === undefined && (
        <div className="flex flex-col items-center">
          <Table
            rows={variant.skus || []}
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
      {selectedSku === undefined && !isNewProduct && (
        <FormButton>{isNewVariant ? 'Add Variant' : 'Edit'}</FormButton>
      )}
    </>
  )
}
