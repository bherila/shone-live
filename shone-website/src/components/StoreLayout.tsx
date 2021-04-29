import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

import { useGetBrandLazyQuery } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.common.black,
  },
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

export default function StoreLayout() {
  const router = useRouter()
  const { brandId }: { brandId?: string } = router.query
  const classes = useStyles()

  const [getBrand, { data: brandData }] = useGetBrandLazyQuery()

  useEffect(() => {
    if (brandId && !brandData)
      getBrand({
        variables: { brandId },
      })
  }, [brandId])

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {brandId && brandData && (
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
                  onClick={() => Router.push(`/seller`)}
                >
                  <FaArrowLeft />
                </IconButton>
              </Box>
              <Box width="80%" className="flex justify-center">
                {['orders', 'products', 'customers', 'analytics', 'shows'].map(
                  (section) => (
                    <Button
                      key={section}
                      className={classes.buttonText}
                      onClick={() =>
                        Router.push(
                          `/seller/store/details/${brandId}/${section}`,
                        )
                      }
                    >
                      {section}
                    </Button>
                  ),
                )}
              </Box>
              <Box width="10%">
                <Typography
                  onClick={() =>
                    Router.push(`/seller/store/details/${brandId}`)
                  }
                >
                  {brandData?.brand.name}
                </Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {brandId && (
        <Box display="flex" flexDirection="column" alignItems="center" m={2}>
          <Box mb={3}>
            <Typography variant="h3" component="h2">
              {brandData?.brand.name}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}
