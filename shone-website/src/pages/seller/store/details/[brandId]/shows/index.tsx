import { CircularProgress } from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import StoreSection from '../../../../../../components/StoreSection'
import Table from '../../../../../../components/Table'
import {
  Brand,
  useGetBrandShowsLazyQuery,
} from '../../../../../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function ShowsPage({ store }: { store: Brand }) {
  const router = useRouter()
  const { brandId }: { brandId?: string } = router.query
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const [getMyShows, { data, loading }] = useGetBrandShowsLazyQuery()

  useEffect(() => {
    if (limit !== undefined && offset !== undefined)
      getMyShows({
        variables: { limit, offset, brandId },
      })
  }, [limit, offset])

  const onChangePage = (page) => {
    setOffset(page * limit)
  }
  const onChangeRowsPerPage = (rowsPerPage) => {
    setOffset(0)
    setLimit(rowsPerPage)
  }

  return (
    <StoreSection store={store}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table
          rows={data?.brandShows || []}
          columns={[
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'Show Segments',
              field: 'showSegments',
              renderField: (row) =>
                row.showSegments?.map(({ title }) => title).join(', '),
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
          bottomActions={[
            {
              handleClick: () =>
                Router.push(`/seller/store/details/${brandId}/shows/new`),
              name: 'Add Show',
            },
          ]}
          rowId="id"
          tableTitle="My Shows"
          tableWidth="75%"
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </StoreSection>
  )
}
