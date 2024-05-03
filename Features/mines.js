let functions,
		array,
		callBack,
		object,
		nativeList,
		components,
		mesh,
		visible,
		positionName,
		x,
		y,
		z,
		arrayList,
		index,
		distance;

function msToTime(s) {
	var pad = (n, z = 2) => ("00" + n).slice(-z);
	return (
		pad((s / 3.6e6) | 0) +
		":" +
		pad(((s % 3.6e6) / 6e4) | 0) +
		":" +
		pad(((s % 6e4) / 1000) | 0) +
		"." +
		pad(s % 1000, 3)
	);
}

export default class {
    #core;
    cfg;

    constructor(core) {
        this.#core = core;
        this.cfg = core.cfg.mines;

        this.process();
    }

    getMinesLength() {
        const minesPath = Object.entries(
            this.#core.utils.findByInit(this.#core.gameObjects.gameMode.components, 'putMine', 1)
        )?.[11]?.[1];

        const minesArray = this.#core.utils.find(minesPath, 'i:1')[1];
        const mines = Object.entries(minesArray)?.[1]?.[1];

        return mines.length;
    }

    findDeactivateMine = (mine) => {
        if (!arrayList) {
            arrayList = this.#core.utils.find(mine, "i:3")?.[0];

            if (!arrayList) return;
        }

        if (!index) {
            let i = 0;
            for (const e of mine[arrayList].filter(this.#core.utils.filterArray) ) {
                if (!functions || !array) {
                    functions = this.#core.utils.find(e, "i:0")?.[0] || "";
                    array = this.#core.utils.find(e[functions], "i:0")?.[0];

                    if (!functions || !array) continue;
                }

                if (e?.[functions]?.[array]) {
                    for (const t of e[functions][array]) {
                        if (!callBack)
                            callBack = this.#core.utils.find(t, "i:1")?.[0];

                        if (t[callBack]?.callableName === "deactivateMine") {
                            index = i
                            break;
                        }
                    }
                }

                i++;
            }
        }

        return mine[arrayList].filter(this.#core.utils.filterArray)?.[index]?.[functions]?.[array]?.[0]?.[callBack];
    }

    removeAllMines = () => {
        const game = this.#core.utils.find(this.#core.gameObjects.world, "ArrayList_0.i:1.0");
        const arrayList = this.#core.utils.find(
            game,
            "i:3"
        )?.[1];

        arrayList?.forEach((e, index) => {
            if (!functions) functions = this.#core.utils.find(e, "i:0")?.[0]
            if (!functions) return
            if (!array) array = this.#core.utils.find(e[functions], "i:0")?.[0]
            if (!array) return

            if (e?.[functions]?.[array]) {
                for (const t of e[functions][array]) {
                    if (!callBack) {
                        callBack = this.#core.utils.find(t, "i:1")?.[0];
                    }

                    if (t[callBack]?.callableName === "removeMines") {
                        const removeMines = arrayList[index + 5][functions][array][0][callBack];
                        object = removeMines?.toString().split(".")[1].split(")")[0];
                        return removeMines()
                    }
                }
            }
        })
    }

    disableRepeats = () => {
        const minesPath = Object.entries(
            this.#core.utils.findByInit(this.#core.gameObjects.gameMode.components, 'putMine', 1)
        )?.[11]?.[1];
        const minesArray = this.#core.utils.find(minesPath, 'i:1')[1];
        const mines = Object.entries(minesArray)?.[1]?.[1];
        let counter = 0,
                len = mines.length;

        const start = new Date().getTime();

        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < mines.length; j++) {
                const mine = mines[j];
                const index = this.#core.utils.find(mine, "i:5")?.[0];

                if (!nativeList || !components || !positionName || !distance) {
                    nativeList = this.#core.utils.find(mine, "i:5")?.[0];
                    components = this.#core.utils.find(mine[index], "i:0")?.[0];
                    positionName = this.#core.utils.find(
                        mine[index], "i:0.2.Ot:1"
                    )?.[0];
                    distance = this.#core.utils.find(
                        mine[index], "i:0.2.Ot:1.__proto__.i:21"
                    )?.[0];

                    if (!nativeList || !components || !positionName || !distance) return;
                }

                const position = mine[nativeList][components][2][positionName];

                for (let k = 0; k < mines.length; k++) {
                    if (j === k) continue;

                    const targetMine 
                        = mines[k];
                    const targetPosition 
                        = targetMine[nativeList][components][2][positionName];

                    if (position[distance](targetPosition) < 8) {
                        this.findDeactivateMine(targetMine)?.();
                        counter++;
                    }
                }
            }
        }

        const end = new Date().getTime();

        console.log(`Removed: ${counter} mines of ${len} for ${msToTime(end - start)}`);
    }

    minesCounter = () => {
        let element = document.querySelector('.BattleHudComponentStyle-tabButton.BattleHudComponentStyle-hudButton');
        
        if (!element) return;
        
        let clone = element?.cloneNode(true);
        clone.id = "pnws.mines.counter"
        if (this.cfg.counter.state && !document.getElementById('pnws.mines.counter')) {
            document.querySelector('.BattleHudComponentStyle-buttonsContainer > div').appendChild(clone);
        }
        if (this.cfg.counter.state && document.getElementById('pnws.mines.counter')) {
            clone.innerHTML = `
                <span></span><img src="https://tankionline.com/play/static/images/Mine.230cdfaa.svg" style="filter: brightness(2) grayscale(1);"></img>
            `;
        if (this.getMinesLength() < 1000) {
            document.querySelectorAll('.BattleHudComponentStyle-tabButton.BattleHudComponentStyle-hudButton > span')[1]
                .textContent = this.getMinesLength();
        } else {
            document.querySelectorAll('.BattleHudComponentStyle-tabButton.BattleHudComponentStyle-hudButton > span')[1]
                .textContent = (core.features.mines.getMinesLength() / 1000).toFixed(1) + 'k';
        }
                
        }
        if (!this.cfg.counter.state && document.getElementById('pnws.mines.counter')) {
            document.getElementById('pnws.mines.counter').remove();
        }
    }

    process = () => {
        if (this.cfg.removeMines.state)
            this.removeAllMines();

        requestAnimationFrame(this.minesCounter);
        requestAnimationFrame(this.process);
    }
}