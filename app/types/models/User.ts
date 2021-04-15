export interface User {
  id: string
  email: string | null
  phone: string
  username: string
  verificationCodeTimeSent: string
  token: string | null
}
