import React from 'react'

import StoreSection from '../../../../../components/StoreSection'
import Table from '../../../../../components/Table'
import { Brand } from '../../../../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
      orders: [
        { id: 'OXXXXXXX0', amount: null, status: 'Not shipped' },
        { id: 'OXXXXXXX1', amount: 32.75, status: 'Not shipped' },
        { id: 'OXXXXXXX2', amount: 32.75, status: 'Not shipped' },
        { id: 'OXXXXXXX3', amount: 32.75, status: 'Not shipped' },
        { id: 'OXXXXXXX4', amount: 32.75, status: 'Not shipped' },
      ],
      shows: [
        {
          id: 'SXXXXXXX0',
          startTime: '3pm today!!',
          title: 'My cool wardrobe',
          products: 2,
        },
        {
          id: 'SXXXXXXX1',
          startTime: '12pm tomorrow',
          title: 'Sunday specials',
          products: 3,
        },
        {
          id: 'SXXXXXXX2',
          startTime: '12pm Monday',
          title: 'Another show title',
          products: 1,
        },
      ],
    },
  }
}

interface OrderModel {
  id: string
  amount: number
  status: string
}

interface ShowModel {
  id: string
  startTime: string
  title: number
  products: string
}

export default function OrdersPage({
  store,
  orders,
  shows,
}: {
  store: Brand
  orders: OrderModel[]
  shows: ShowModel[]
}) {
  return (
    <StoreSection store={store}>
      <Table
        rows={orders}
        columns={[
          {
            title: 'Order ID',
            field: 'id',
          },
          {
            title: 'Amount',
            field: 'amount',
            renderField: (order) => (1 * order.amount)?.toFixed(2) || '-',
          },
          {
            title: 'Status',
            field: 'status',
          },
        ]}
        tableWidth="100%"
        rowId="id"
        tableTitle="Orders need fulfillment"
        bottomActions={[{ name: 'View all orders' }]}
      />
      <Table
        rows={shows}
        columns={[
          {
            title: 'Start Time',
            field: 'startTime',
          },
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'Products',
            field: 'products',
          },
        ]}
        tableWidth="100%"
        rowId="id"
        tableTitle="Upcoming Shows"
        bottomActions={[{ name: 'Schedule a show' }]}
      />
    </StoreSection>
  )
}
