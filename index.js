import GameObjects from "./Game/gameObjects.js";
import Utils from "./Shared/utils.js";
import KeyPressing from "./Shared/keyPressing.js";
import Menu from "./Menu/menu.js";
import Config from "./Shared/config.js";
import Features from './Features/features.js';

let arrayList, array;

class Core {
  keyPressing;
  gameObjects;
  utils;
  menu;
  config;
  features;

  constructor() {
    console.log("%cPENNYWISE", "font-size: 100px; color: rgb(255, 255, 255);");

    this.keyPressing = new KeyPressing();
    this.utils = new Utils(this, this.keyPressing);
    this.gameObjects = new GameObjects(this);
    this.menu = new Menu(this);
    this.config = new Config();
    this.features = new Features(this);

    this.process();
  }

  get cfg() {
    return this.config.data;
  }

  reset = () => {
    this.gameObjects.reset();
  };

  process = () => {
    if (this.gameObjects.world && (!arrayList || !array)) {
      arrayList = this.utils.find(this.gameObjects.world, "arrayList:1")?.[0];
      array = this.utils.find(this.gameObjects.world, "arrayList:1.i:1")?.[0];
    }

    if (
      this.gameObjects.world?.[arrayList]?.[array]?.length === 0 ||
      !this.gameObjects.world?.[arrayList]?.[array]
    )
      return this.reset(), requestAnimationFrame(this.process);

    requestAnimationFrame(this.process);
  };
}

const core = new Core();
unsafeWindow.core = core;

// 123 1