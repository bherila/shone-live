import { CircularProgress, Grid } from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import StoreSection from '../../../../../components/StoreSection'
import Table from '../../../../../components/Table'
import {
  Brand,
  useGetBrandShowsLazyQuery,
} from '../../../../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function ShowsPage({ store }: { store: Brand }) {
  const router = useRouter()
  const { pid }: { pid?: string } = router.query
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const [getMyProducts, { data, loading }] = useGetBrandShowsLazyQuery()

  useEffect(() => {
    if (limit !== undefined && offset !== undefined)
      getMyProducts({
        variables: { limit, offset, brandId: pid },
      })
  }, [limit, offset])

  const onChangePage = (page) => {
    setOffset(page * limit)
  }
  const onChangeRowsPerPage = (rowsPerPage) => {
    console.log(rowsPerPage)
    setOffset(0)
    setLimit(rowsPerPage)
  }

  console.log(data)

  return (
    <StoreSection store={store}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table
          handleRowClick={(id) => Router.push(`/seller/store/details/${id}`)}
          rows={data?.brandShows || []}
          columns={[
            {
              title: 'Title',
              field: 'title',
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
                    Router.push(`/seller/store/${row.id}`)
                  }}
                  size={20}
                />
              ),
              field: 'actions',
            },
          ]}
          bottomActions={[
            {
              handleClick: () => Router.push(`/seller/store/new`),
              name: 'Add Show',
            },
          ]}
          rowId="id"
          tableTitle="My Stores"
          tableWidth="75%"
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </StoreSection>
  )
}
