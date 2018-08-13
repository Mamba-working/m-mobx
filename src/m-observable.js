import dependenceManager from './s-dependence-manager'
let count = 0
class Observable {
  /**
   * 全局唯一 id
   * @type {string}
   */
  obId = ''
  value = null
  constructor (v) {
    this.obId = 'ob-'+(++count)
    if (Array.isArray(v)){
      this._wrapArrayProxy(v)
    }
    else {
      this.value = v
    }
  }
  get() {
    dependenceManager.collect(this.obId)
    return this.value
  }
  set(v) {
    if (Array.isArray(v)){
      this._wrapArrayProxy(v)
    }
    else {
      this.value = v
    }
    dependenceManager.trigger(this.obId)
  }
  trigger () {
    dependenceManager.trigger(this.obId)
  }
  _wrapArrayProxy (v) {
    this.value = new Proxy(v, {
      set: (obj,key,value) => {
        obj[key] = value
        if (key !== 'length') {
          this.trigger()
        }
        return false
      }
    })
  }
}

export default Observable