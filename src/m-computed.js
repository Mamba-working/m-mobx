
import dependenceManager from './m-dependence-manager'
let cpIDCounter = 1
class Computed {
  value = null
  getter = null
  target = null
  cpID = 0
  hasBindAutoReCompute = false
  constructor (target, getter) {
    this.cpID = 'cp-'+(++cpIDCounter)
    this.target = target
    this.getter = getter
  }
  _reCompute() {
    this.value = this.getter.call(this.target)
    dependenceManager.trigger(this.cpID)
  }
  _bindAutoReCompute () {
    if(!this.hasBindAutoReCompute) {
      this.hasBindAutoReCompute = true
      dependenceManager.collectStart(this._reCompute, this)
      this._reCompute();
      dependenceManager.collectEnd()
    }
  }
  get () {
    this._bindAutoReCompute()
    dependenceManager.collect(this.cpId)
    return this.value
  }
}
export default Computed