app.game = {

  start: function() {
    
    this.entities = new ENGINE.Entities;
    this.collisions = new ENGINE.Collisions(this.entities);
    this.collisions.callback = this.collisionHandler.bind(this);

    this.players = [];

    this.addPlayer(app.center.x, app.center.y, 0);

    this.spawnAsteroid();
    this.spawnAsteroid();
    this.spawnAsteroid();
    this.spawnAsteroid();

  },

  collisionHandler: function(a, b) {

  },

  spawnAsteroid: function() {
    
    var angle = Math.random() * 6;
    
    var x = Math.cos(angle) * app.width;
    var y = Math.sin(angle) * app.width;

    this.entities.add(ENGINE.Asteroid, {
      x: x,
      y: y,
      direction: angle
    });

  },

  addPlayer: function(x, y, team) {

    var player = this.entities.add(ENGINE.Player, {
      team: team,
      x: x,
      y: y
    });

    this.players.push(player);

    return player;
  },

  wrap: function(entity) {

    entity.x = Utils.wrap(entity.x, -entity.radius, app.width + entity.radius);
    entity.y = Utils.wrap(entity.y, -entity.radius, app.height + entity.radius);

  },

  /* events */

  enter: function() {

  },

  step: function(delta) {

    this.entities.step(delta);
    this.collisions.step(delta);

  },

  render: function(delta) {

    app.layer.clear("#003");

    this.entities.render(delta);

    this.hud.render(delta);

  },

  keydown: function(e) {
    switch (e.key) {
      case "space":
        this.players[0].shooting = true;
        break;
      case "left":
        this.players[0].left = true;
        break;
      case "right":
        this.players[0].right = true;
        break;
      case "up":
        this.players[0].up = true;
        break;
    }
  },

  keyup: function(e) {
    switch (e.key) {
      case "space":
        this.players[0].shooting = false;
        break;
      case "left":
        this.players[0].left = false;
        break;
      case "right":
        this.players[0].right = false;
        break;
      case "up":
        this.players[0].up = false;
        break;
    }
  }

};