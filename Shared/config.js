export default class {
  data = {
    mines: {
      id: "-1",
      removeMines: {
        state: false,
        bind: {
          keys: [],
          pressed: false
        }
      },
      counter: {
        state: false,
        bind: {
          keys: [],
          pressed: false
        }
      },
      disableRepeats: {
        state: 10,
        bind: {
          keys: [],
          pressed: false
        }
      }
    },

    physics: {
      id: "0",
      gravity: {
        state: false,
        value: 1,
        bind: {
          keys: [],
          pressed: false,
        },
      },
      recoil: {
        state: false,
        vaue: 1,
        bind: {
          keys: [],
          pressed: false,
        },
      },
    },
    other: {
      id: "0",
      tw: {
        state: false,
        bind: {
          keys: [],
          pressed: false,
        },
      },
      fov: {
        state: false,
        value: "1.0471976",
        bind: {
          keys: [],
          pressed: false,
        },
      },
    },
  };

  constructor() {
    for (const key in this.data) {
      let result = localStorage.getItem(key);

      if (
        !result ||
        ((result = JSON.parse(result)), this.data[key].id !== result.id)
      ) {
        console.error(`[PNWS] No config found - ${key}`);
        this.saveState(key);
        continue;
      }

      this.data[key] = result;
    }

    this.saveStates();
  }

  clearCookies = () => {
    for (let key in this.data) {
      localStorage.removeItem(key);
    }
  };

  saveState = (state) =>
    localStorage.setItem(state, JSON.stringify(this.data[state]));

  saveStates = () => {
    for (let key in this.data) {
      this.saveState(key);
    }
  };
}
