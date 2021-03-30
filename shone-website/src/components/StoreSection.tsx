import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Router from 'next/router'
import React from 'react'

import { StoreModel } from '../pages/seller'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttonText: {
    color: 'white',
  },
}))

export default function StoreSection({
  store,
  children,
}: {
  store: StoreModel
  children: React.ReactNode
}) {
  const classes = useStyles()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box width="10%">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                -
              </IconButton>
            </Box>
            <Box>
              <Button
                className={classes.buttonText}
                onClick={() => Router.push(`/seller/store/${store.id}/`)}
              >
                Orders
              </Button>
              <Button
                className={classes.buttonText}
                onClick={() =>
                  Router.push(`/seller/store/${store.id}/products`)
                }
              >
                Products
              </Button>
              <Button
                className={classes.buttonText}
                onClick={() =>
                  Router.push(`/seller/store/${store.id}/customers`)
                }
              >
                Customers
              </Button>
              <Button
                className={classes.buttonText}
                onClick={() =>
                  Router.push(`/seller/store/${store.id}/analytics`)
                }
              >
                Analytics
              </Button>
              <Button
                className={classes.buttonText}
                onClick={() => Router.push(`/seller/store/${store.id}/shows`)}
              >
                Shows
              </Button>
            </Box>
            <Box width="10%">
              <Typography>{store.name}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" m={2}>
        <Box mb={3}>
          <Typography variant="h3" component="h2">
            {store.name}
          </Typography>
        </Box>
        <Box width="100%" justifyContent="center" display="flex">
          {children}
        </Box>
      </Box>
    </>
  )
}
