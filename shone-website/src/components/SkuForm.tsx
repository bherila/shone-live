import React from 'react'
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'

import FormButton from './FormButton'
import Input from './Input'
import Select from './Select'

export default function SkuForm({
  cancelEdit,
  errors,
  isNewProduct,
  isNewVariant,
  register,
  selectedSku,
}: {
  cancelEdit: () => void
  errors: DeepMap<FieldValues, FieldError>
  isNewProduct: boolean
  isNewVariant: boolean
  register: UseFormRegister<FieldValues>
  selectedSku: number
}) {
  return (
    <>
      {!isNewProduct && !isNewVariant && (
        <FaArrowLeft
          onClick={cancelEdit}
          className="hover:text-blue-700 text-blue-500 font-bold my-2"
        />
      )}
      <Input
        label="Sku"
        name="variantData.skuData.name"
        register={register}
        registerOptions={{ required: true }}
        error={errors.name && 'is required'}
      />
      <Input
        label="Sku Friendly Name"
        name="variantData.skuData.friendlyName"
        register={register}
        registerOptions={{ required: true }}
        error={errors.name && 'is required'}
      />
      <Select
        label="Sku COGS"
        name="variantData.skuData.COGS"
        register={register}
        registerOptions={{ required: true }}
        error={errors.brandId && 'is required'}
      >
        {['usd'].map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
      <Input
        label="Sku Stock"
        name="variantData.skuData.stock"
        type="number"
        register={register}
        registerOptions={{ required: true, valueAsNumber: true }}
        error={errors.name && 'is required'}
      />
      {selectedSku !== undefined && (
        <FormButton>{selectedSku === -1 ? 'Add Sku' : 'Edit'}</FormButton>
      )}
    </>
  )
}
