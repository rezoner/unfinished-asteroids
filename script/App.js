var app = playground({

  width: 320,
  height: 240,

  scaleToFit: false,

  smoothing: true,

  create: function() {

    this.loadImages("spritesheet");
    
  },

  ready: function() {

    this.game.start();

    this.setState(this.game);

  },

  step: function(delta) {

  },

  render: function(delta) {

    this.layer.clear("#008");
    this.layer.fillStyle("#fff").font("64px Arial").fillText("Hello World!", 32, 64);

  },

  mousedown: function(event) {

  },

  mouseup: function(event) {

  },

  mousemove: function(event) {

  },

  keydown: function(event) {

  },

  keyup: function(event) {

  }

});
