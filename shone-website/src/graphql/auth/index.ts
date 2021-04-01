import NextAuth from 'next-auth'
import jwt from 'next-auth/jwt'

export default NextAuth({
  jwt: {
    encryption: true,
    encode: async ({ secret, Payload }) => {
      console.log(`Payload`, Payload)
      // const jwtClaims = {
      //   "sub": Payload.id.toString() ,
      //   "name": Payload.name ,
      //   "phone": Payload.phone,
      //   "iat": Date.now() / 1000,
      //   "https://hasura.io/jwt/claims": {
      //     "x-hasura-allowed-roles": ["user"],
      //     "x-hasura-default-role": "user",
      //     "x-hasura-role": "user",
      //     "x-hasura-user-id": Payload.id,
      //   }
      // };
      const encodedToken = jwt.sign(Payload, secret, { algorithm: 'HS256' })
      return encodedToken
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] })
      return decodedToken
    },
    // async decode({ secret, token, maxAge }) {},
  },
})
