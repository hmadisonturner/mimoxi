import MimoxiControl from "./Control.js";

export default class MimoxiButton extends MimoxiControl {
  constructor(element) {
    super(element);
    this.element.style.visibility = "visible";
    this.graphic = this.element.getElementsByTagName("g")[0];
    this.off = true;
  }

  set on(flag) {
    this.unbind("click", this.bindings["click"]);
    this.bind("click", (event) => {
      this.off = true;
    });
    this.graphic.setAttribute("class", "on");
    this.element.dispatchEvent(new Event("on"));
  }

  get on() {
    return this.graphic.hasAttribute("class");
  }

  set off(flag) {
    this.unbind("click", this.bindings["click"]);
    this.bind("click", (event) => {
      this.on = true;
    });
    this.graphic.removeAttribute("class");
    this.element.dispatchEvent(new Event("off"));
  }

  get off() {
    return !this.graphic.hasAttribute("class");
  }
}
