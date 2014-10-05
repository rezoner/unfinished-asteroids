ENGINE.Collisions = function(entities) {

  this.entities = entities;

};

ENGINE.Collisions.prototype = {


  step: function(delta) {

    for (var i = 0; i < this.entities.children.length; i++) {

      var a = this.entities.children[i];

      if (!a.collidable) continue;

      for (var j = i + 1; j < this.entities.children.length; j++) {

        var b = this.entities.children[j];

        if (!b.collidable) continue;

        if (Utils.distance(a, b) < a.radius + b.radius) {

          if (a.collision) a.collision(b);
          if (b.collision) b.collision(a);

          if (this.callback) this.callback(a, b);

        }

      }
    }

  },

  /* this shit is short but buggy - what a crappy day... at crappy company
     - temporary leaving it for emergency use */

  step2: function() {

    for (var i = 0; i < this.entities.children.length; i++) {
      for (var j = 0; j < this.entities.children.length; j++) {
        var a = this.entities.children[i];
        var b = this.entities.children[j];
        if (Utils.distance(a, b) < a.radius + b.radius) {
          a.collision(b);
          b.collision(a);
        }
      }
    }
  }

};