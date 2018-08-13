var nowObserver = null;
var nowTarget = null;
var observerStack = [];
var targetStack = [];
var isCollecting = false;
const dependenceManager = {
    _store: {},
    _addNowObserver(obID) {
        this._store[obID] = this._store[obID] || {};
        this._store[obID].target = nowTarget;
        this._store[obID].watchers = this._store[obID].watchers || [];
        this._store[obID].watchers.push(nowObserver);
    },
    trigger(id) {
        var ds = this._store[id];
        if(ds && ds.watchers) {
            ds.watchers.forEach((d) => {
                d.call(ds.target || this);
            });
        }
    },
    beginCollect(observer, target) {
        isCollecting = true;
        observerStack.push(observer);
        targetStack.push(target);
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    },
    collect(obID) {
        if(nowObserver) {
            this._addNowObserver(obID);
        }
        return false;
    },
    endCollect() {
        isCollecting = false;
        observerStack.pop();
        targetStack.pop();
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    }
};

export default dependenceManager;