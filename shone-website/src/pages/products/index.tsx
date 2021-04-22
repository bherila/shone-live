import { Grid } from '@material-ui/core'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import ProductsTable from '../../components/ProductTable'
import { Product, useGetMyProductsLazyQuery } from '../../generated/graphql'

export default function ProductsPage() {
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const [getMyProducts, { data }] = useGetMyProductsLazyQuery()

  useEffect(() => {
    if (limit !== undefined && offset !== undefined)
      getMyProducts({
        variables: { limit, offset },
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

  return (
    <Grid container alignItems="center" justify="center">
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={3}
      >
        <ProductsTable
          products={(data?.myProducts as Product[]) || []}
          bottomActions={[
            {
              handleClick: () => Router.push(`/products/new`),
              name: 'New Product',
            },
          ]}
          handleEdit={(id) => Router.push(`/products/${id}`)}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  )
}
