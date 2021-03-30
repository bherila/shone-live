import React from 'react'

import StoreSection from '../../../../components/StoreSection'
import { StoreModel } from '../..'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function AnalyticsPage({ store }: { store: StoreModel }) {
  return <StoreSection store={store}>BUILDING ANALYTICS PAGE</StoreSection>
}
