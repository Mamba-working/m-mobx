import dependenceManager from './s-dependence-manager'

const autorun = (handler) => {
  dependenceManager.collectStart(handler)
  handler()
  dependenceManager.collectEnd()
}
export default autorun