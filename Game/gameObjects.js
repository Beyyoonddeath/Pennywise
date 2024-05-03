import GameMode from "./gameMode.js";

export default class {
  #root;
  #world;
  #gameMode;
  #core;

  constructor(core) {
    this.#core = core;
  }

  get root() {
    if (this.#root) return this.#root;

    return (this.#root = this.#core.utils.find(
      unsafeWindow.root,
      "i:0.child.child.stateNode.i:7"
    )?.[1]);
  }

  get world() {
    if (this.#world) return this.#world;
    let ThreadSafeList = this.#core.utils.find(this.root, "i:3.i:1.i:1")?.[1];
    if (!ThreadSafeList) return;
    let BattleEntity = this.#core.utils.findByLength(
      ThreadSafeList,
      3
    )?.[1]?.[0];
    if (!BattleEntity) return;
    this.#world = this.#core.utils.getComponentNames(
      this.#core.utils.getByIndex(BattleEntity, 1)?.[1]
    );
    if (this.#world) this.#gameMode = new GameMode(this.#world);

    return this.#world;
  }
  get gameMode() {
    return this.#gameMode;
  }

  reset = () => {
    this.#world = this.$gameMode = undefined;
  };
}
