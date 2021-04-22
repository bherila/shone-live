// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
// global.FormData = global.originalFormData || global.FormData

// if (window.FETCH_SUPPORT) {
//   window.FETCH_SUPPORT.blob = false
// } else {
//   global.Blob = global.originalBlob || global.Blob
//   global.FileReader = global.originalFileReader || global.FileReader
// }

import { registerRootComponent } from 'expo'

import App from './App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
