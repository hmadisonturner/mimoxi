import MimoxiButton from "./Button.js";
import MimoxiKey from "./Key.js";
export default class Mimoxi {
  constructor() {
    const scale = [
      "do", // 1:1 root
      "re", // 2:1 octave
      "mi", // 3:2 perfect fifth
      "fa", // 4:3 perfect fourth
      "so", // 5:4 major third
      "la", // 6:5 minor third
      "ti", // 7:6 septimal minor third
      "do1", // 8:7 supermajor second
    ];
    this.beat = 90;
    this.panel = document.getElementById("panel");
    this.keys = [];

    const init = (event) => {
      const audio = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = audio.createBuffer(1, 1, 22050);
      const source = audio.createBufferSource();
      source.buffer = buffer;
      source.connect(audio.destination);
      source.start(0);
      this.audio = audio;
      audio.suspend();
      this.keys = scale.map(
        (str, index) =>
          new MimoxiKey(
            document.getElementById(str),
            this.audio,
            792 * (index + 1)
          )
      );

      document.removeEventListener("touchend", init);
      document.removeEventListener("mouseup", init);

      const bind = () => {
        this.bindKeys();
        this.bindButtons();
      };
      keyPress() ? this.awakenFrom(event.target, bind) : this.awaken(bind);

      function keyPress() {
        return (
          event.target.tagName.toLowerCase() === "button" &&
          event.target.id !== "panel"
        );
      }
    };
    document.addEventListener("touchend", init);
    document.addEventListener("mouseup", init);
  }

  gameLoop() {
    this.flash(this.pattern(this.flash(this.flash())));
  }

  pattern(callback) {
    const level = 1;
    const sequence = [];
    for (let i = 0; i < level; i++) {
      sequence.push(Math.floor(Math.random() * 9));
    }
    callback();
  }

  ask(sequence, callback) {
    callback();
  }

  flash(callback) {
    callback();
  }

  allLitUp() {
    return (
      this.keys.find(
        (key, index) => key.element.getAttribute("class") !== "lit"
      ) === undefined
    );
  }

  updateKeys(map) {
    this.keys.forEach((key, index) => {
      key.element.removeAttribute("class");
      if (map[index].length > 0) {
        key.element.setAttribute("class", map[index]);
      }
    });
  }

  hasBrightNeighbor(index) {
    switch (index) {
      case 0:
        return this.keys[1].bright || this.keys[3].bright;
      case 1:
        return this.keys[0].bright || this.keys[2].bright;
      case 2:
        return (
          this.keys[1].bright || this.keys[3].bright || this.keys[7].bright
        );
      case 3:
        return (
          this.keys[0].bright || this.keys[2].bright || this.keys[4].bright
        );
      case 4:
        return this.keys[3].bright || this.keys[5].bright;
      case 5:
        return this.keys[4].bright || this.keys[6].bright;
      case 6:
        return (
          this.keys[3].bright || this.keys[5].bright || this.keys[7].bright
        );
      case 7:
        return this.keys[2].bright || this.keys[6].bright;
    }
    return false;
  }

  awakenFrom(element, callback) {
    this.keys.find((key) => key.element === element).bright = true;
    const delay = 90;
    let nextMap;

    const next = () => {
      if (nextMap) {
        this.updateKeys(nextMap);
        nextMap = undefined;
      }
      if (this.allLitUp()) {
        if (callback) callback();
      } else {
        nextMap = this.keys.map((key, index) => {
          switch (key.element.getAttribute("class")) {
            case "lit":
            case "on":
              return "lit";
            default: // no class = dim
              return this.hasBrightNeighbor(index) ? "on" : "";
          }
        });
        setTimeout(next, delay);
      }
    };
    next();
  }

  awaken(callback) {
    this.keys[0].light = true;
    this.keys[4].light = true;
    setTimeout(() => {
      this.keys[1].light = true;
      this.keys[3].light = true;
      this.keys[5].light = true;
      setTimeout(() => {
        this.keys[2].light = true;
        this.keys[6].light = true;
        setTimeout(() => {
          this.keys[7].light = true;
          if (callback) callback();
        }, 90);
      }, 90);
    }, 90);
  }

  hello(callback) {
    let i = 0;
    const step = () => {
      if (i === 8) {
        this.keys[7].stop();
        if (callback) callback();
      } else {
        if (i > 0) this.keys[i - 1].stop();
        this.keys[i].play();
        setTimeout(step, this.beat);
        i++;
      }
    };
    step();
  }

  bindButtons() {
    this.buttons = {
      mode: new MimoxiButton(document.getElementById("mode_btn_svg")),
      mute: new MimoxiButton(document.getElementById("mute_btn_svg")),
    };
    this.buttons["mode"].bind("on", (e) => this.hello());
    this.buttons["mute"].bind("on", (e) => this.audio.resume());
    this.buttons["mute"].bind("off", (e) => this.audio.suspend());
  }

  unbindButtons() {
    for (const b in this.buttons) {
      this.buttons[b].unbindAll();
    }
  }

  unbindKeys() {
    this.keys.forEach((control) => control.unbindAll());
  }

  bindKeys() {
    this.unbindKeys();
    const play = (event) => {
      event.preventDefault();
      this.keys.find((key) => key.element === event.target).play();
    };
    const stop = (event) => {
      this.keys.find((key) => key.element === event.target).stop();
    };
    this.keys.forEach((key) => {
      key
        .bind("mousedown", play)
        .bind("mouseup", stop)
        .bind("touchstart", play)
        .bind("touchend", stop);
    });
  }
}
