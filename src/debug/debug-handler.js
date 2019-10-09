import { getMode } from 'react-storefront-moov-xdn/manifest'

export default function() {
  return {
    moovManifest: global.env.moovManifest,
    moov_mode_name: global.env.moov_mode_name,
    mode: getMode()
  }
}
