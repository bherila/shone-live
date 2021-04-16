import React from 'react'

import { Product } from '../generated/graphql'
import Table from './Table'

export default function ProductsTable({
  products,
  bottomActions,
  onRowClick,
}: {
  products: Product[]
  bottomActions?: any[]
  onRowClick?: (id: number) => void
}) {
  return (
    <Table
      rows={products || []}
      rowId="id"
      columns={[
        {
          title: 'SKU',
          field: 'id',
        },
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Show',
          renderField: ({ show }) => show.title,
          field: 'show',
        },
      ]}
      tableWidth="75%"
      tableTitle="Products"
      handleRowClick={onRowClick}
      bottomActions={bottomActions}
    />
  )
}
