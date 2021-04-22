import React from 'react'

import StoreSection from '../../../../components/StoreSection'
import { Brand } from '../../../../generated/graphql'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function AnalyticsPage({ store }: { store: Brand }) {
  return <StoreSection store={store}>BUILDING ANALYTICS PAGE</StoreSection>
}
