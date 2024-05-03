export default class {
  keyPresseds = [];

  constructor() {
    document.addEventListener("keydown", (e) => {
      this.keyPresseds.includes(e.code) === false &&
        this.keyPresseds.push(e.code);
    });

    document.addEventListener("keyup", (e) => {
      if (this.keyPresseds.includes(e.code) === true) {
        let index = this.keyPresseds.indexOf(e.code);
        index > -1 && this.keyPresseds.splice(index, 1);
      }
    });

    addEventListener("visibilitychange", () => {
      this.keyPresseds = [];
    });

    addEventListener("focus", () => {
      this.keyPresseds = [];
    });
  }

  isKeyPressed = (keyCode) => {
    return this.keyPresseds.includes(keyCode);
  };
}
