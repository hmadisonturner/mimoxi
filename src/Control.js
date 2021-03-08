export default class MimoxiControl {
  constructor (mimoxi, element) {
    this.mimoxi = mimoxi
    this.element = element
    this.bindings = {}
  }

  bind (event, handler) {
    this.bindings[event] = handler
    this.element.addEventListener(event, handler)
    return this
  }

  unbind (event, handler) {
    delete this.bindings[event]
    this.element.removeEventListener(event, handler)
    return this
  }

  unbindAll () {
    for (const binding in this.bindings) {
      this.unbind(binding, this.bindings[binding])
    }
    return this
  }
}
