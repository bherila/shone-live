import { Card, CircularProgress, Grid } from '@material-ui/core'
import Router from 'next/router'
import React from 'react'

import ProductsTable from '../../components/ProductTable'
import { Product, useGetMyProductsQuery } from '../../generated/graphql'

export default function ProductsPage() {
  const { data, loading } = useGetMyProductsQuery({
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
            <ProductsTable
              products={(data?.my_products as Product[]) || []}
              bottomActions={[
                {
                  handleClick: () => Router.push(`/products/new`),
                  name: 'New Product',
                },
              ]}
              onRowClick={(id) => Router.push(`/products/${id}`)}
            />
          )}
        </Grid>
      </Card>
    </Grid>
  )
}
