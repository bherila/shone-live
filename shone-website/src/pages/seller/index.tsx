import { Box } from '@material-ui/core'
import Router from 'next/router'
import React from 'react'

import Table from '../../components/Table'

export async function getServerSideProps() {
  return {
    props: { stores: [{ name: "Bretton's Store", id: 'S00001' }] },
  }
}

export interface StoreModel {
  id: string
  name: string
}

export default function SellerPage({ stores }: { stores: StoreModel[] }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" m={2}>
      <Table
        handleRowClick={(id) => Router.push(`/seller/store/${id}`)}
        rows={stores}
        columns={[
          {
            title: 'Store Name',
            field: 'name',
          },
          {
            title: 'ID',
            field: 'id',
          },
        ]}
        rowId="id"
        tableTitle="My Stores"
        tableWidth="50%"
      />
    </Box>
  )
}
