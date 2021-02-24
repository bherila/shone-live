import jwt from 'jsonwebtoken'

function CheckLogin(ctx) {
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
