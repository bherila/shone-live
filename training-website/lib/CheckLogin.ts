import jwt from 'jsonwebtoken'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

export interface CheckLoginResult {
  loggedInUser: string
  isUserLoggedIn: boolean
}

function CheckLogin(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
): CheckLoginResult {
  if (ctx.req.cookies.jwt) {
    const jwtToken = ctx.req.cookies.jwt
    const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

    if (!jwtData.id) return { loggedInUser: null, isUserLoggedIn: false }

    if (Date.now() >= jwtData.exp * 1000)
      return { loggedInUser: null, isUserLoggedIn: false }

    return {
      loggedInUser: jwtData,
      isUserLoggedIn: true,
    }
  } else {
    return {
      loggedInUser: null,
      isUserLoggedIn: false,
    }
  }
}

export default CheckLogin
