/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'

import { message } from '../../common/message'
import { ShowYourStyleVideoIdEntry } from '../show-your-style-entry/entities/show-your-style-video-entry.entity'

@Injectable()
export class StyleVideoService {
  constructor() {}

  async addTransloaditVideoEntry(req: Request, res: Response) {
    try {
      if (req.body.transloadit) {
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
          await getConnection()
            .createQueryBuilder()
            .update(ShowYourStyleVideoIdEntry)
            .set({
              videoUrl: videoData.video_url,
              jsonData: videoData.json_data,
              urls: videoData.urls,
              isViewable: videoData.isViewable,
            })
            .where('video_id = :videoId', { videoId: videoData.video_id })
            .execute()

          return res.json({
            status: data.http_code ? data.http_code : 200,
            msg: message.uploadVideoSuccess,
          })
        } else if (data.error) {
          let errMsg = ''
          if (
            data.stderr.includes('Invalid data found when processing input')
          ) {
            errMsg = 'You can upload only mov,mp4,3gp,mj2,m4a format videos'
          }
          await getConnection()
            .createQueryBuilder()
            .update(ShowYourStyleVideoIdEntry)
            .set({
              isViewable: videoData.isViewable,
              error: errMsg ? errMsg : message.uploadVideoFailed,
            })
            .where('video_id = :videoId', { videoId: videoData.video_id })
            .execute()
          return res.json({
            status: data.http_code ? data.http_code : 500,
            msg: errMsg ? errMsg : message.uploadVideoFailed,
          })
        } else if (data.ok === 'ASSEMBLY_UPLOADING') {
          await getConnection()
            .createQueryBuilder()
            .update(ShowYourStyleVideoIdEntry)
            .set({
              isViewable: videoData.isViewable,
              error: data.message,
            })
            .where('video_id = :videoId', { videoId: videoData.video_id })
            .execute()
          return res.json({
            status: data.http_code ? data.http_code : 500,
            msg: data.message,
          })
        }
      }
    } catch (error) {
      return res.json({ status: 500, msg: message.videoUploadError })
    }
  }
}