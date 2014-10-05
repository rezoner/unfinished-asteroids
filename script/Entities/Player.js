ENGINE.Player = function(args) {

  Utils.extend(this, {

    /* movement */

    direction: 0,
    speed: 0,
    acceleration: 200,
    deacceleration: 50,
    maxSpeed: 200,
    rotationSpeed: 3,

    /* custom force */

    force: 0,
    forceDirection: 0,
    forceDamping: 0, // per second

    /* shooting */

    cooldown: 0,
    maxCooldown: 0.3,

    hp: 10,
    maxHp: 10

  }, args);

  this.sprite = this.sprites[this.team];

  this.width = this.sprite[2];
  this.height = this.sprite[3];
  this.radius = Math.min(this.width, this.height) / 2 | 0;

};

ENGINE.Player.prototype = {

  constructor: ENGINE.Player,

  zIndex: 2,

  collidable: true,

  sprites: [
    [13, 65, 20, 16],
    [36, 65, 20, 16],
  ],

  collision: function(object) {

    if (object instanceof ENGINE.Asteroid) {

      this.hit({
        damage: 1
      });

      object.hit({
        damage: 2
      });

      /* bounce in the opposite direction */

      this.applyForce(this.direction - Math.PI, this.speed * 2);

      this.speed = 0;

    }

  },

  applyForce: function(direction, value) {
    this.forceDirection = direction;
    this.force = value;
    this.forceDamping = value;
  },

  hit: function(data) {

    this.hp = Math.max(0, this.hp - data.damage);

    if (this.hp <= 0) {

      this.collection.remove(this);
    }
  },

  shoot: function() {

    this.collection.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      direction: this.direction,
      team: this.team,
      damage: 1
    });

  },

  step: function(delta) {

    /* speed and acceleration */

    if (this.up) this.speed = Math.min(this.maxSpeed, this.speed + this.acceleration * delta);
    else this.speed = Math.max(0, this.speed - this.deacceleration * delta);

    /* movement */

    this.x += Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;

    /* force */

    this.x += Math.cos(this.forceDirection) * this.force * delta;
    this.y += Math.sin(this.forceDirection) * this.force * delta;

    this.force = Math.max(0, this.force - this.forceDamping * delta);

    /* rotation */

    if (this.left) this.direction = Utils.wrap(this.direction - this.rotationSpeed * delta, 0, Math.PI * 2);
    if (this.right) this.direction = Utils.wrap(this.direction + this.rotationSpeed * delta, 0, Math.PI * 2);

    /* shooting */

    if (this.shooting) {
      if ((this.cooldown -= delta) <= 0) {
        this.shoot();
        this.cooldown = this.maxCooldown;
      }
    }

    /* wrap */

    app.game.wrap(this);
  },

  render: function() {

    app.layer.save();

    app.layer.translate(this.x, this.y);
    app.layer.rotate(this.direction + Math.PI / 2);
    app.layer.drawRegion(app.images.spritesheet, this.sprite, -this.width / 2, -this.height / 2);

    app.layer.restore();

  }

};