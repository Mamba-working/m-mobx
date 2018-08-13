import Observable from './m-observable'

const createObservableProperty = (target, property) => {
  const observable = new Observable(target[property])
  Object.defineProperty(target, property,{
    get: () => observable.get(),
    set: (value) => observable.set(value)
  })
  if (typeof (target[property]) === 'object') {
    for (let i in target[property]) {
      if (target[property].hasOwnProperty(i)) {
        createObservableProperty(target[property], i)
      }
    }
  }
}

const extendObservable = (target, obj) => {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i]
      createObservableProperty(target, i)
    }
  }
}

const createObserable = (taget) => {
  for (let i in target) {
    if (target.hasOwnProperty(i)){
      createObservableProperty(target, i)
    }
  }
}
export {
  extendObservable,
  createObserable
}