export default class {
  battleEntity;
  components;

  physics = {
    orientation: {
      x: 0,
      y: 0,
      z: 0,
    },
    velocity: {
      x: 0,
      y: 0,
      z: 0,
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  };

  constructor() {
    const ThreadSafeList = core.utils.find(
      core.gameObjects.root,
      "i:3.i:1.i:1"
    )?.[1];
    this.battleEntity = core.utils.findByLength(ThreadSafeList, 3)?.[1]?.[0];
    this.components = core.utils.find(this.battleEntity, "i:5.i:0")?.[1];

    this.tankPhysicsComponent = core.utils.findByInit(
      this.components,
      "setPhysicsTransform",
      7
    );

    this.body = core.utils.find(this.tankPhysicsComponent, "i:17")?.[1];

    this.bodyState = core.utils.find(this.body, "i:24")?.[1];

    const velocity = core.utils.find(this.bodyState, "i:0")?.[1];

    this.physics.velocity = {
      x: core.utils.find(velocity, "i:0")?.[1],
      y: core.utils.find(velocity, "i:1")?.[1],
      z: core.utils.find(velocity, "i:2")?.[1],
    };

    const position = core.utils.find(this.bodyState, "i:3")?.[1];

    this.physics.position = {
      x: core.utils.find(position, "i:0")?.[1],
      y: core.utils.find(position, "i:1")?.[1],
      z: core.utils.find(position, "i:2")?.[1],
    };

    const orientation = core.utils.find(this.bodyState, "i:1")?.[1];

    this.physics.orientation = {
      x: core.utils.find(orientation, "i:0")?.[1],
      y: core.utils.find(orientation, "i:1")?.[1],
      z: core.utils.find(orientation, "i:2")?.[1],
    };
  }
}
