import React from 'react'

import StoreSection from '../../../../../components/StoreSection'
import { Brand } from '../../../../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function CustomersPage({ store }: { store: Brand }) {
  return <StoreSection store={store}>BUILDING CUSTOMERS PAGE</StoreSection>
}
