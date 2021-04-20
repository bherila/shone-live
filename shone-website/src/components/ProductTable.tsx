import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import { Product } from '../generated/graphql'
import Table from './Table'

export default function ProductsTable({
  products,
  bottomActions,
  handleEdit,
  onChangePage,
  onChangeRowsPerPage,
}: {
  products: Product[]
  bottomActions?: any[]
  handleEdit?: (id: string) => void
  onChangePage?: (page: number) => void
  onChangeRowsPerPage?: (rowsPerPage: number) => void
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
          title: 'Brand',
          renderField: ({ brand }) => brand?.name,
          field: 'brand',
        },
        {
          title: 'Actions',
          renderField: (row) => (
            <FaPencilAlt onClick={() => handleEdit(row.id)} size={20} />
          ),
          field: 'actions',
        },
      ]}
      tableWidth="75%"
      tableTitle="Products"
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      bottomActions={bottomActions}
    />
  )
}
