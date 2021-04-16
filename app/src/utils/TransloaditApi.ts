import TusJsClient from 'tus-js-client'
import { TRANSLOADIT_KEY, TRANSLOADIT_TEMPLATE_ID } from '@env'
import Transloadit from '@uppy/transloadit'
import Uppy from '@uppy/core'
//https://api2.transloadit.com/assemblies

const uppy: Uppy.Uppy = Uppy().use(Transloadit, {
  params: {
    auth: { key: TRANSLOADIT_KEY },
    template_id: TRANSLOADIT_TEMPLATE_ID
  },
  limit: 1,
  waitForEncoding: false,
  waitForMetadata: false,
  importFromUploadURLs: false,
  alwaysRunAssembly: false,
  signature: null,
  fields: {}
})

export { uppy }
