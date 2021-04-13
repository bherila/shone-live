import AWS from 'aws-sdk'
import fs from 'fs' // Needed for example below
import path from 'path'

// const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')
// const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.SPACES_KEY,
//   secretAccessKey: process.env.SPACES_SECRET,
// })

// var params = {
//   Bucket: "example-space-name"
// };

// s3.createBucket(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else     console.log(data);
// });

export const fileUpload = async (file) => {
  try {
    if (file) {
      const dir = process.env.BUCKET_NAME
      const bucket_path = process.env.USERPROFILE_IMAGE_PATH

      AWS.config.update({
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET,
      })

      const extention = path.extname(file.name)
      const splitName = file.name.split('.')
      let filename = splitName[0] + extention
      let filepath = bucket_path + '/' + filename
      if (fs.existsSync(filepath)) {
        filename = splitName[0] + '_copy' + extention
        filepath = bucket_path + '/' + filename
      }
      const s3 = new AWS.S3()
      const params = {
        Bucket: dir,
        Key: filename, // type is not required
        Body: file.data,
        ACL: 'public-read',
        ContentType: file.mimetype,
      }
      s3.upload(params, (err, data) => {
        console.log('uploadeddd', err, data)
        if (err) {
          console.log('File UPload Err:', err)
        } else {
          console.log('File Upload Success!!')
        }
      })
    }
  } catch (error) {
    console.log(`error=> `, error)
  }
}
