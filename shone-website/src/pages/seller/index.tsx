import { Card, CircularProgress, Grid } from '@material-ui/core'
import Router from 'next/router'
import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import Table from '../../components/Table'
import { useGetMyBrandsQuery } from '../../generated/graphql'

export default function SellerPage() {
  const { data, loading } = useGetMyBrandsQuery({
    variables: { limit: 10, offset: 0 },
  })

  return (
    <Grid container alignItems="center" justify="center">
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={3}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Table
            handleRowClick={(id) => Router.push(`/seller/store/details/${id}`)}
            rows={data?.my_brands || []}
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
                title: 'ID',
                field: 'id',
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
                name: 'Create Brand',
              },
            ]}
            rowId="id"
            tableTitle="My Stores"
            tableWidth="75%"
            // onChangePage={onChangePage}
            // onChangeRowsPerPage={onChangeRowsPerPage}
          />
        )}
      </Grid>
    </Grid>
  )
}
