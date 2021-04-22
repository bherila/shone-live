import mysql from 'mysql2'
import util from 'util'

import { message } from '../../nest/common/message'

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  insecureAuth: true,
  database: process.env.MYSQL_DB,
})
db.connect()

const query = util.promisify(db.query).bind(db)

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      if (req.body) {
        const { transloadit } = req.body
        const data = JSON.parse(transloadit)
        const urlData = data.results.video_hls
          ? data.results.video_hls.map(({ ssl_url }) => ssl_url)
          : ''

        const videoData: any = {
          urls: urlData ? JSON.stringify(urlData) : '',
          json_data: JSON.stringify(data),
          video_id: data.assembly_id,
          user_id: data.fields.user_id,
          error: data.error ? data.error : null,
          isViewable: 0,
          video_url: null,
        }

        if (data.ok === 'ASSEMBLY_COMPLETED') {
          videoData.video_url = data.results
            ? data.results.video_hls[3].ssl_url
            : ''
          videoData.isViewable = 1
          await query(
            `UPDATE show_your_style_video_id_entry set video_url='${videoData.video_url}',jsonData='${videoData.json_data}',
          urls='${videoData.urls}',isViewable=${videoData.isViewable} WHERE video_id=${videoData.video_id}`,
          )
          return res.json({ status: 200, msg: message.videoUploadSuccess })
        } else if (data.error) {
          let errMsg = ''
          if (
            data.stderr.includes('Invalid data found when processing input')
          ) {
            errMsg = 'You can upload only mov,mp4,3gp,mj2,m4a format videos'
          }
          await query(
            `UPDATE show_your_style_video_id_entry set error='${
              errMsg ? errMsg : message.videoUploadError
            }',isViewable=${videoData.isViewable} WHERE video_id=${
              videoData.video_id
            }`,
          )
          return res.json({
            status: data.http_code ? data.http_code : 500,
            msg: errMsg ? errMsg : message.videoUploadError,
          })
        }
      }
    } else {
      return res.json({ status: 400, msg: message.routeNotExist })
    }
  } catch (error) {
    return res.json({
      status: 500,
      msg: message.videoUploadFailed,
      err: error.message,
    })
  }
}
