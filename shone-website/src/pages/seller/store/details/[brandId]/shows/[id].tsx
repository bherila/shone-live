import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa'

import Input from '../../../../../../components/Input'
import Select from '../../../../../../components/Select'
import Table from '../../../../../../components/Table'
import {
  useAddShowSegmentMutation,
  useAddShowWithSegmentMutation,
  useGetBrandProductsLazyQuery,
  useGetShowLazyQuery,
} from '../../../../../../generated/graphql'

export default function AddEditShow() {
  const router = useRouter()
  const { id, brandId }: { id?: string; brandId?: string } = router.query

  const [
    getBrandProducts,
    { data, loading: loadingBrandProduct },
  ] = useGetBrandProductsLazyQuery()
  const [addShow] = useAddShowWithSegmentMutation()
  const [addShowSegment, addShowSegmentResponse] = useAddShowSegmentMutation()
  const [
    getShow,
    { data: showData, loading: loadingGetShow },
  ] = useGetShowLazyQuery({ fetchPolicy: 'no-cache' })

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm()

  useEffect(() => {
    if (brandId) {
      getBrandProducts({
        variables: { limit: 10, offset: 0, brandId },
      })
    }
  }, [brandId])

  useEffect(() => {
    if (id) {
      reset({ title: '' })
      getShow({ variables: { showId: id } })
    }
  }, [id, addShowSegmentResponse.data])

  const isNew = id === 'new'

  const onSubmit = (data) => {
    if (isNew) {
      addShow({
        variables: { ...data, brandId },
      }).then(({ data }) => {
        router.push(
          `/seller/store/details/${brandId}/shows/${data.addShowWithSegment.id}`,
        )
      })
    } else {
      addShowSegment({
        variables: {
          ...data.showSegment,
          showId: id,
          brandId,
        },
      })
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <FaArrowLeft
        onClick={() => router.push(`/seller/store/details/${brandId}/shows/`)}
        className="hover:text-blue-700 self-start text-blue-500 font-bold m-8 absolute"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-4/12 shadow-md rounded px-8 pt-6 pb-8 my-4"
      >
        {!isNew && showData?.show && (
          <div className="flex flex-col items-center">
            <div>Title: {showData.show.title}</div>
            <div>
              from {showData.show.start_date} to {showData.show.end_date}
            </div>
            <Table
              rows={showData.show.showSegments || []}
              columns={[
                {
                  title: 'Title',
                  field: 'title',
                },
                {
                  title: 'Products',
                  field: 'products',
                  renderField: (row) =>
                    row.products?.map(({ name }) => name).join(', '),
                },
                {
                  title: 'Actions',
                  renderField: () => (
                    <FaTrashAlt
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      size={20}
                    />
                  ),
                  field: 'actions',
                },
              ]}
              rowId="id"
              tableWidth="100%"
              styleProps={{ height: 300 }}
            />
          </div>
        )}
        {isNew && (
          <>
            <Input
              label="Name"
              name="title"
              registerOptions={{ required: true }}
              register={register}
              error={errors?.title?.type}
            />
            <Input
              label="Start Date"
              name="startDate"
              type="datetime-local"
              registerOptions={{ required: true }}
              register={register}
              error={errors?.startDate?.type}
            />
            <Input
              label="End Date"
              name="endDate"
              type="datetime-local"
              registerOptions={{ required: true }}
              register={register}
              error={errors?.endDate?.type}
            />
          </>
        )}
        <>
          <Input
            label="Segment Title"
            name="showSegment.title"
            registerOptions={{ required: true }}
            register={register}
            error={errors?.showSegment?.title?.type}
          />
          <Select
            label="Products"
            name="showSegment.productsIds"
            register={register}
            registerOptions={{ required: true }}
            error={errors?.showSegment?.productsIds?.type}
            multiple
          >
            {data?.brandProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={
              loadingBrandProduct ||
              addShowSegmentResponse.loading ||
              loadingGetShow
            }
          >
            {isNew ? 'Create' : 'Add Segment'}
          </button>
        </div>
      </form>
    </div>
  )
}
