let fov;

export default class {
  #core;
  cfg;

  constructor(core) {
    this.#core = core;
    this.cfg = core.cfg.other.fov;

    this.process();
  }

  getCamera = () => {
    const localPlayer = this.#core?.gameObjects?.gameMode?.localPlayer;
    if (!localPlayer) return;

    const followCamera = this.#core.utils.findByInit(
      localPlayer?.components,
      "onSpawnCameraTransformQuery",
      7
    );

    return this.#core.utils.find(followCamera, "i:24")?.[1];
  }

  setFov = () => {
    const camera = this.getCamera();
    this.#core.utils.prototypeHook(camera, "i:0", values => {
      if (!fov) {
        fov = this.#core.utils.find(values, "i:0")?.[0];
        if (!fov) return;
      }

      values[fov] = this.cfg.value;
    });
  }

  process = () => {
    if (!this.#core.utils.isGameReady) return;
    if (this.cfg.state) {
      requestAnimationFrame(this.setFov);
    }
    
    requestAnimationFrame(this.process);
  }
}
