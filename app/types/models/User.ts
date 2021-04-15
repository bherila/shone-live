export interface User {
  id: string
  email: string | null
  phone: string
  username: string | null
  verificationCodeTimeSent?: string
  token: string | null
}
