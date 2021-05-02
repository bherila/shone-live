import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa'

import FormButton from '../../../../../../components/FormButton'
import Input from '../../../../../../components/Input'
import Select from '../../../../../../components/Select'
import Table from '../../../../../../components/Table'
import {
  ShowSegment,
  useAddShowSegmentMutation,
  useAddShowWithSegmentMutation,
  useGetBrandProductsLazyQuery,
  useGetShowLazyQuery,
  useUpdateShowMutation,
  useUpdateShowSegmentMutation,
} from '../../../../../../generated/graphql'

export default function AddEditShow() {
  const [selectedShowSegment, setSelectedShowSegment] = useState<number>()
  const router = useRouter()
  const { id, brandId }: { id?: string; brandId?: string } = router.query

  const [
    getBrandProducts,
    { data, loading: loadingBrandProduct },
  ] = useGetBrandProductsLazyQuery()
  const [addShow] = useAddShowWithSegmentMutation()
  const [updateShow] = useUpdateShowMutation()
  const [addShowSegment, addShowSegmentResponse] = useAddShowSegmentMutation()
  const [updateShowSegment] = useUpdateShowSegmentMutation()
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
    if (id && id !== 'new') {
      reset({ title: '' })
      getShow({ variables: { showId: id } })
    }
  }, [id, addShowSegmentResponse.data])

  useEffect(() => {
    if (showData && !isNew) {
      reset({
        title: showData.show.title,
        endDate: format(new Date(showData.show.end_date), "yyyy-MM-dd'T'hh:mm"),
        startDate: format(
          new Date(showData.show.start_date),
          "yyyy-MM-dd'T'hh:mm",
        ),
      })
    }
  }, [showData])

  const isNew = id === 'new'
  const isNewShowSegment = selectedShowSegment === -1

  const addEditShowSegment = async (show) => {
    const showSegment = isNewShowSegment
      ? { ...show.showSegment, brandId, showId: showData.show.id }
      : {
          id: showData.show.showSegments[selectedShowSegment].id,
          ...show.showSegment,
        }

    await (isNewShowSegment ? addShowSegment : updateShowSegment)({
      variables: showSegment,
    })
    setSelectedShowSegment(undefined)
    getShow({ variables: { showId: id } })
  }

  const addEditShow = async (show) => {
    try {
      await (isNew ? addShow : updateShow)({
        variables: isNew
          ? { ...show, brandId }
          : { ...show, id: showData.show.id },
      })
    } catch (e) {
      console.log('e', e)
    }
    if (id !== 'new') getShow({ variables: { showId: id } })
  }

  const onSubmit = (data) => {
    if (isNew || selectedShowSegment === undefined) {
      addEditShow(data)
    } else {
      addEditShowSegment(data)
    }
  }

  const selectShowSegment = (e, showSegment: ShowSegment) => {
    e.stopPropagation()
    setSelectedShowSegment(
      showData.show.showSegments.findIndex(({ id }) => id === showSegment.id),
    )
    reset({
      showSegment: {
        title: showSegment.title,
        productsIds: showSegment.products.map(({ id }) => id),
      },
    })
  }

  const onAddShowSegmentClick = () => {
    setSelectedShowSegment(-1)
    reset({
      showSegment: {},
    })
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
        {(isNew || selectedShowSegment === undefined) && (
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
        {!isNew && !isNewShowSegment && selectedShowSegment === undefined && (
          <FormButton
            type="submit"
            disabled={
              loadingBrandProduct ||
              addShowSegmentResponse.loading ||
              loadingGetShow
            }
          >
            Edit
          </FormButton>
        )}
        {!isNew && showData?.show && selectedShowSegment === undefined && (
          <div className="flex flex-col items-center">
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
                  renderField: (row) => (
                    <FaPencilAlt
                      onClick={(e) => selectShowSegment(e, row)}
                      size={20}
                    />
                  ),
                  field: 'actions',
                },
              ]}
              rowId="id"
              tableWidth="100%"
              bottomActions={[
                {
                  handleClick: onAddShowSegmentClick,
                  name: 'Add Show Segment',
                },
              ]}
              styleProps={{ height: 300 }}
            />
          </div>
        )}
        {(isNew || selectedShowSegment !== undefined) && (
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
        )}
        {(isNew || isNewShowSegment || selectedShowSegment !== undefined) && (
          <FormButton
            type="submit"
            disabled={
              loadingBrandProduct ||
              addShowSegmentResponse.loading ||
              loadingGetShow
            }
          >
            {isNew ? 'Create' : isNewShowSegment ? 'Add Segment' : 'Edit'}
          </FormButton>
        )}
      </form>
    </div>
  )
}
