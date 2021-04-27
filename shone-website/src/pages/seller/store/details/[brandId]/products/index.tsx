import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import ProductsTable from '../../../../../../components/ProductTable'
import StoreSection from '../../../../../../components/StoreSection'
import {
  Brand,
  Product,
  useGetBrandProductsLazyQuery,
} from '../../../../../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function ProductsPage({ store }: { store: Brand }) {
  const router = useRouter()
  const { brandId }: { brandId?: string } = router.query
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const [getBrandProducts, { data }] = useGetBrandProductsLazyQuery()

  useEffect(() => {
    if (limit !== undefined && offset !== undefined)
      getBrandProducts({
        variables: { limit, offset, brandId },
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

  const [newProducts, setNewProducts] = useState([])
  useEffect(() => {
    const { SKU, title, SRP, stock } = Router.query
    if (!SKU) return
    setNewProducts([...newProducts, { SKU, title, SRP, stock }])
  }, [])
  return (
    <StoreSection store={store}>
      <ProductsTable
        products={(data?.brandProducts as Product[]) || []}
        bottomActions={[
          {
            handleClick: (row) =>
              Router.push(`/seller/store/detals/${brandId}/products/${row.id}`),
            name: 'New Product',
          },
        ]}
        handleEdit={(id) => Router.push(`/products/${id}`)}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </StoreSection>
  )
}
