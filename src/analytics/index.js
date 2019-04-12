import DebugTarget from 'react-storefront-extensions/DebugTarget'

export default () => [
  new DebugTarget().sendForAllEvents()
]