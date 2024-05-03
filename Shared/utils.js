export default class {
  #core;

  keyPressing;

  constructor(core, keyPressing) {
    this.#core = core;
    this.keyPressing = keyPressing;
  }

  getName = (object) => object?.constructor?.name;

  getSimpleName = (object) => object?.constructor?.$metadata$?.simpleName;

  equal = (a, b) => a?.toUpperCase() === b?.toUpperCase();

  getRandomArbitrary = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  fuzzySearch = (needle, haystack) => {
    var hlen = haystack.length;
    var nlen = needle.length;
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
      var nch = needle.charCodeAt(i);
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  };

  findObjectByName = (
    object,
    name,
    index = -1,
    last = false,
    fuzzy = false
  ) => {
    let i = 0;
    for (const key in object) {
      if (
        typeof object[key] === "object" &&
        (fuzzy
          ? this.fuzzySearch(name, this.getName(object[key]))
          : this.equal(this.getName(object[key]), name))
      ) {
        if (index === -1 || index === i)
          return last ? [key, object[key]] : object[key];

        i++;
      }
    }
  };
  findByIndex = (object, index, last = false) => {
    const entries = Object.entries(object)?.[index];

    if (last) return entries;

    if (typeof entries?.[1] === "object") return entries[1];

    return entries?.[0];
  };

  getByIndex = (object, index) =>
    object ? Object.entries(object)[index] : undefined;

  find = (object, path) => {
    if (typeof path !== "string" && !Array.isArray(path))
      throw new Error(
        `Путь должен быть строкой 'obj.obj2.obj3...' или массивом [ 'obj', 'obj2', 'obj3' ... ]`
      );

    const arrayPath = Array.isArray(path) ? path : path.split(".");

    let result = object;
    arrayPath.forEach((name, index) => {
      if (!result) return;

      const last = index === arrayPath.length - 1;
      if (result[name]) result = result[name];
      else if (name.slice(0, 2) === "i:")
        result = this.findByIndex(result, name.slice(2, name.length), last);
      else if (name.slice(0, 6) === "fuzzy:")
        result = this.findObjectByName(
          result,
          name.slice(6, name.length),
          -1,
          last,
          true
        );
      else {
        const split = name.split(":");
        if (split.length === 2)
          result = this.findObjectByName(result, split[0], +split[1], last);
        else result = this.findObjectByName(result, name, -1, last);
      }

      if (typeof result !== "object") return result;
    });
    return result;
  };

  getComponentNames = (element) => {
    if (typeof element !== "object" && typeof element !== "function") return;

    const result = {};

    for (const [key, value] of Object.entries(element)) {
      if (Array.isArray(value)) {
        result[key] = value;
        continue;
      }

      if (typeof value === "function" && value.callableName) {
        result[value.callableName] = element[key];
        continue;
      }

      const name = value?.constructor?.$metadata$?.simpleName;

      if (!name) continue;

      if (result[name]) {
        for (let i = 0; ; i++) {
          const tempName = `${name}_${i}`;

          if (!result[tempName]) {
            result[tempName] = value;
            break;
          }
        }
      } else {
        result[name] = value;
      }
    }

    result["original"] = element;

    return result;
  };

  findByInit = function(arr, name, index) {
    if (!arr || !name || !index) return;
    const components = arr;
    for (const component of components) {
      const prototype = component?.__proto__;
      const init = Object.values(prototype)[index];
      if (init?.toString()?.includes(name)) {
        return component;
      }
    }
  };

  findByLength = function(obj, length) {
    let validObjects = [];

    for (let i = 0; i < obj.length; i++) {
      let objectsArray = [];

      for (let key in obj[i]) {
        if (typeof obj[i][key] == "object") {
          objectsArray.push(obj[i][key]);
        }
      }

      if (objectsArray.length == length) validObjects.push(objectsArray);
    }
    return validObjects;
  }

  getByLength = function(obj, length) {
    if (!obj) return;
    let validObjects = [];

    for (let i = 0; i < obj?.length; i++) {
      let objectsArray = [];

      for (let key in obj?.[i]) {
        if (typeof obj?.[i]?.[key] == 'object') {
          objectsArray.push(obj?.[i]?.[key]);
        }
      }

      if (objectsArray.length == length) validObjects.push(objectsArray);
    }

    return validObjects;
  }

  filterArray = value => value != null;

  isChatOpen = () => document.getElementsByTagName("input").length > 0;

  getKeyState = (key) =>
    this.keyPressing.isKeyPressed(key) && !this.isChatOpen();

  isArrayValid = (array) =>
    typeof array !== "undefined" && Array.isArray(array) && array.length > 0;

  isArrayPressed = (keys) => {
    if (!this.isArrayValid(keys)) return false;

    for (let key of keys) {
      if (!this.getKeyState(key)) return false;
    }

    return true;
  };

  isBindPressed = (object) => {
    if (this.#core.menu.isOpen || this.isChatOpen()) return false;

    let bind = object.bind;
    if ("pressed" in bind) {
      let result = this.isArrayPressed(bind.keys);

      if (bind.pressed === false) {
        if (result === true) {
          bind.pressed = true;
          return true;
        }
      } else if (result !== true) {
        bind.pressed = false;
        return false;
      }

      return false;
    }

    return this.isArrayPressed(bind.keys);
  }

  prototypeHook = function (obj, selector, callBack) {
    let after = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let args = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    if (!constructor) return;
    const prototype = obj.constructor.prototype,
      functionName = prototype[selector] && selector || this.find(prototype, selector)?.[0];
    if (!functionName) return;
    !prototype[`${functionName}_copy`] && (prototype[`${functionName}_copy`] = prototype[functionName]);
    prototype[functionName] = function () {
      try {
        if (after) {
          const result = prototype[`${functionName}_copy`].apply(this, arguments);
          [].push.call(arguments, prototype[`${functionName}_copy`]);
          [].push.call(arguments, result);
          const callBackResult = args ? callBack.call(this, arguments) : callBack.apply(this, arguments);
          if (callBackResult) return callBackResult;
          return result;
        }
        [].push.call(arguments, prototype[`${functionName}_copy`]);
        const callBackResult = args ? callBack.call(this, arguments) : callBack.apply(this, arguments);
        if (callBackResult) return callBackResult;
        return prototype[`${functionName}_copy`].apply(this, arguments);
      } catch (e) {
        console.error(e);
      }
    }
  }

  proxyHook = (object, selector, callBack) => {
    const functionName = object[selector] && selector || find(object, selector)?.[0];

    if (!functionName) return;

    !object[`${functionName}_copy`] && (object[`${functionName}_copy`] = object[functionName]);
    object[functionName] = new Proxy({}, {
      get: (target, prop) => function () {
        const callBackResult = callBack(prop, arguments);
        if (callBackResult) return callBackResult;
        return object[`${functionName}_copy`][prop].apply(null, arguments);
      }
    })
  }


  get rootObject() {
    let objectKey,
      root = document.getElementById('root');

    if (!root) return;

    for (const key in Object.keys(root)) {
      let prop = Object.keys(root)[key];

      if (prop.includes('reactContainer')) objectKey= key;
    }

    return this.find(Object.entries(root)?.[objectKey]?.[1]?.child?.child?.stateNode, "i:7.i:3")?.[1];
  }

  get isGameReady() {
    const threadSafeList = this.find(this.rootObject, "i:1.i:1")?.[1];
    const battleEntity = this.getByLength(threadSafeList, 3)?.[1]?.[0];

    return battleEntity ? true : false;
  }
}