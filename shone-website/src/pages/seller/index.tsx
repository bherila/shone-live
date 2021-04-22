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
      <Card className="w-6/12 p-4 m-4">
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
              handleRowClick={(id) => Router.push(`/seller/store/${id}`)}
              rows={data.my_brands}
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
                      onClick={() => Router.push(`/seller/${row.id}`)}
                      size={20}
                    />
                  ),
                  field: 'actions',
                },
              ]}
              rowId="id"
              tableTitle="My Stores"
              tableWidth="75%"
            />
          )}
        </Grid>
      </Card>
    </Grid>
  )
}
