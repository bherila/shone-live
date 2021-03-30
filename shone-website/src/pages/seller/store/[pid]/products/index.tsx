import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import StoreSection from '../../../../../components/StoreSection'
import Table from '../../../../../components/Table'
import { StoreModel } from '../../..'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
      products: [
        {
          SKU: 'K19371',
          title: 'Cool Sweatshirt',
          SRP: 75,
          stock: 132,
        },
      ],
    },
  }
}

export interface ProductModel {
  SKU: string
  title: string
  SRP: number
  stock: number
}

export default function ProductsPage({
  store,
  products,
}: {
  store: StoreModel
  products: ProductModel[]
}) {
  const [newProducts, setNewProducts] = useState([])
  useEffect(() => {
    const { SKU, title, SRP, stock } = Router.query
    if (!SKU) return
    setNewProducts([...newProducts, { SKU, title, SRP, stock }])
  }, [])
  return (
    <StoreSection store={store}>
      <Table
        rows={[...products, ...newProducts]}
        columns={[
          {
            title: 'SKU',
            field: 'SKU',
          },
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'SRP',
            field: 'SRP',
            renderField: (product) => (1 * product.SRP)?.toFixed(2) || '-',
          },
          {
            title: 'Stock Qty',
            field: 'stock',
          },
        ]}
        tableWidth="50%"
        rowId="SKU"
        tableTitle="Products"
        bottomActions={[
          {
            handleClick: () =>
              Router.push(`/seller/store/${store.id}/products/new`),
            name: 'New Product',
          },
        ]}
      />
    </StoreSection>
  )
}
