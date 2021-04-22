import mysql from 'mysql2'
import util from 'util'

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
  console.log(`here we will get response`)
  if (req.body) {
    const { transloadit } = req.body
    const data = JSON.parse(transloadit)
    const urlData = data.results
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
      const result = await query(
        `UPDATE show_your_style_video_id_entry set video_url=${videoData.video_url}, json_data=${videoData.json_data},urls=${videoData.urls}, isViewable=${videoData.isViewable} WHERE video_id= ${videoData.video_id}`,
      )
      console.log(result)
    }
  }
}
