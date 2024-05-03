import FOV from './fov.js';
import Mines from './mines.js';

export default class {
    #core;

    fov;
    mines;

    constructor(core) {
        this.fov = new FOV(core);
        this.mines = new Mines(core);

        this.#core = core;
        if (!this.#core.utils.isGameReady) return;

        this.process();
    }

    process = () => {
        this.fov.process();
        this.mines.process();

        requestAnimationFrame(this.process);
    }
}