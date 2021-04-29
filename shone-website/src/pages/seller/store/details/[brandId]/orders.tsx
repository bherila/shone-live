import { CircularProgress } from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import CenteredContainer from '../../../../../components/CenteredContainer'
import Table from '../../../../../components/Table'
import { useGetBrandOrdersLazyQuery } from '../../../../../generated/graphql'

export default function ShowsPage() {
  const router = useRouter()
  const { brandId }: { brandId?: string } = router.query
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const [getBrandOrders, { data, loading }] = useGetBrandOrdersLazyQuery()

  useEffect(() => {
    if (limit !== undefined && offset !== undefined && brandId)
      getBrandOrders({
        variables: { limit, offset, brandId },
      })
  }, [limit, offset, brandId])

  const onChangePage = (page) => {
    setOffset(page * limit)
  }
  const onChangeRowsPerPage = (rowsPerPage) => {
    setOffset(0)
    setLimit(rowsPerPage)
  }

  return (
    <CenteredContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table
          rows={data?.brandOrders || []}
          columns={[
            {
              title: 'Name',
              field: 'name',
            },
            {
              title: 'Description',
              field: 'description',
            },
            {
              title: 'Actions',
              renderField: (row) => (
                <FaPencilAlt
                  onClick={(e) => {
                    e.stopPropagation()
                    Router.push(
                      `/seller/store/details/${brandId}/shows/${row.id}`,
                    )
                  }}
                  size={20}
                />
              ),
              field: 'actions',
            },
          ]}
          rowId="id"
          tableTitle="My Orders"
          tableWidth="75%"
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </CenteredContainer>
  )
}
