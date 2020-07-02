/* eslint-disable */
class Observer {
  constructor() {

  }

  update(val) {

  }
}

class ObserverList {
  constructor() {
    this.observerList = []
  }
  add(observer) {
    return this.observerList.push(observer)
  }
  remove(observer) {
    this.observerList = this.observerList.filter(ob => ob !== observer)
  }
  count() {
    return this.observerList.length
  }
  get(index) {
    return this.observerList[index]
  }
}

class Subject {
  constructor() {
    this.observers = new ObserverList()
  }
  addObserver(observer) {
    this.observers.add(observer)
  }
  removeObserver(observer) {
    this.observers.remove(observer)
  }
  notify(...args) {
    const obCount = this.observers.count()
    for (let index = 0; index < obCount; index++) {
      this.observers.get(i).update(...args)
    }
  }
}

class PubSub {
  constructor() {
    this.subscribers = {}
  }

  subscribe(type, fn) {
    if (!this.subscribers.hasOwnProperty(type)) {
      this.subscribers[type] = []
    }

    this.subscribers[type].push(fn)
  }

  unsubscribe(type, fn) {
    const listeners = this.subscribers[type]
    if (!listeners || !listeners.length) return
    listeners.forEach(fn => fn(...args))
  }
}
