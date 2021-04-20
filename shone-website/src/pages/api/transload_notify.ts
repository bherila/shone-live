export default function handler(req, res) {
  if (req.body) {
    console.log(`req.body`, req.body)
    const { transloadit } = req.body
    console.log('transloadit', transloadit)

    if (transloadit.ok === 'ASSEMBLY_COMPLETED') {
      const videoData: any = {}
      videoData.video_id = transloadit.assembly_id
      videoData.user_id = transloadit.fields.user_id
      videoData.basename = transloadit.results
        ? transloadit.results.video_hls[3].basename
        : ''
      videoData.video_url = transloadit.results
        ? transloadit.results.video_hls[3].ssl_url
        : ''
      videoData.isViewable = 1

      console.log('videoData', videoData)
      res.json({
        videoData: videoData,
        message: 'The Upload Process completed successfully',
      })
    } else if (transloadit.ok === 'ASSEMBLY_CANCELED') {
      res.json({
        videoData: null,
        message: 'The Upload Process completed successfully',
      })
    } else if (transloadit.ok === 'REQUEST_ABORTED') {
      res.json({
        videoData: null,
        message: 'The Upload Process completed successfully',
      })
    }
  }
}
