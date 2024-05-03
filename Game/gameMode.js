import Player from "./localPlayer.js";

export default class {
  game;
  mode;
  localPlayer;
  components;

  constructor(world) {
    this.game = core.utils.find(world, "ArrayList_0.i:1.0");
    const map = Array.from(
      core.utils.find(world.original, "i:20.i:1.0.i:6.i:0")?.[1]
    );

    this.game.mode = {};
    for (const array of map) {
      this.game.mode[core.utils.find(array[0], "i:1")[1]] = core.utils.find(
        array[1],
        "i:0"
      )[1][0];
      this.mode = this.game.mode[""];
      this.components = core.utils.find(this.game, "i:5.i:0")?.[1];

      this.localPlayer = new Player();
    }
  }
}
