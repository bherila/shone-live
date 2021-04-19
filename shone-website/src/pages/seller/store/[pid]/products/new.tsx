import { Button, Grid } from '@material-ui/core'
import Router from 'next/router'
import React from 'react'

import StoreSection from '../../../../../components/StoreSection'
import { Brand } from '../../../../../generated/graphql'
import useInput from '../../../../../hooks/useInput'

export async function getServerSideProps() {
  return {
    props: {
      store: { name: "Bretton's Store", id: 'S00001' },
    },
  }
}

export default function ProductsPage({ store }: { store: Brand }) {
  const [SKU, renderSKU] = useInput({
    name: 'SKU',
    defaultValue: '',
  })
  const [title, rendertitle] = useInput({
    name: 'title',
    defaultValue: '',
  })
  const [SRP, renderSRP] = useInput({
    name: 'SRP',
    defaultValue: 0,
    type: 'number',
  })
  const [stock, renderStock] = useInput({
    name: 'stock',
    defaultValue: 0,
    type: 'number',
  })

  const handleSubmit = () => {
    Router.push({
      pathname: `/seller/store/${store.id}/products`,
      query: { SKU, title, SRP, stock },
    })
  }

  return (
    <StoreSection store={store}>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container justify="center">
          <Grid container xs={6} spacing={3}>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                {renderSKU()}
              </Grid>
              <Grid item xs={6}>
                {rendertitle()}
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                {renderSRP()}
              </Grid>
              <Grid item xs={6}>
                {renderStock()}
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </StoreSection>
  )
}
