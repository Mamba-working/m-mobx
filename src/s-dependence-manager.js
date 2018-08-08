const dependenceManager ={
  _store: {},
  _isCollecting: false,
  observerStack: [],
  targetStack: [],
  nowObserver: null,
  nowTarget: null,
  collectStart: (observer, target) => {
    this._isCollecting = true
    this.observerStack.push(observer)
    this.targetStack.push(target)
    this.nowObserver = this.observerStack.length > 0 ? this.observerStack[this.observerStack.length - 1] : null
    this.nowTarget = this.targetStack.length > 0 ? this.targetStack[this.targetStack.length - 1] : null;
  },
  collect = (id) => {
    if (this.nowObserver) {
      this._addNowObserver(id)
    }
    return false
  },
  collectEnd = () => {
    this._isCollecting = false
    this.observerStack.pop()
    this.targetStack.pop()
    this.nowObserver = this.observerStack.length > 0 ? this.observerStack[this.observerStack.length - 1] : null
    this.nowTarget = this.targetStack.length > 0 ? this.targetStack[this.targetStack.length - 1] : null;
  },
  _addNowObserver = (id) => {
    this._store[id] = this._store[id] || {}
    this._store[id] = this.nowTarget
    this._store[id] = this._store.watchers || []
    this._store[id].watchers.push(this.nowObserver)
  },
  trigger = (id) => {
    const deps = this._store[id]
    if (deps && deps.watcher.length > 0) {
      deps.watcher.forEach((dep) => {
        dep.call(dep.target || this)
      })
    }
  }
}

export default dependenceManager