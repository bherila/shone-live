import { TRANSLOADIT_KEY, TRANSLOADIT_TEMPLATE_ID } from '@env'
import Transloadit from '@uppy/transloadit'
import Uppy from '@uppy/core'
import { useAppSelector } from '../redux/store'
//https://api2.transloadit.com/assemblies

const UppyClient = () => {
  const user = useAppSelector(state => state.user.user?.id)

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
    fields: {
      user_id: user
    },
    notify_url: 'http://aae32d36da18.ngrok.io/api/transload_notify'
  })

  return {
    uppy
  }
}

export { UppyClient }
