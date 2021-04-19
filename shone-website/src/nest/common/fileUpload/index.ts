import AWS from 'aws-sdk'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const fileUpload = async (file) => {
  try {
    if (file) {
      const spacesEndpoint = new AWS.Endpoint(process.env.BUCKET_ENDPOINT)
      const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET,
      })

      const buf = Buffer.from(file.toString())

      const extention = path.extname(file.name)
      const uploadFileName = uuidv4() + extention
      const param = {
        Bucket: process.env.BUCKET_NAME,
        Key: uploadFileName,
        Body: buf,
        ACL: 'public-read',
        ContentType: file.type,
      }
      try {
        await s3.putObject(param)
        return `https://${process.env.BUCKET_NAME}.${process.env.BUCKET_ENDPOINT}/${uploadFileName}`
      } catch (error) {
        return Error(error.stack)
      }
    }
  } catch (error) {
    return error
  }
}
