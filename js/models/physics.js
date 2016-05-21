

var Physics = {

  /**
   * updateVelocity updates an Entities velocity, for semi-implicit euler.
   * @param {Object} v a THREE.Vector3 object representing initial velocity.
   * @param {Object} a a THREE.Vector3 object representing acceleration.
   * @param {Number} dt Delta time - change in time since the last time-step.
   */
  updateVelocity: function (v, a, dt) {
    v.add(a.clone().multiplyScalar(dt));
    v.multiplyScalar(0.99); // damping
  },

  /**
   * updatePosition updates an Entities position, for semi-implicit euler.
   * @param {Object} s a THREE.Vector3 object representing initial position.
   * @param {Object} a a THREE.Vector3 object representing velocity.
   * @param {Number} dt Delta time - change in time since the last time-step.
   */
  updatePosition: function (s, v, dt) {
    s.add(v.clone().multiplyScalar(dt));
  },

  /**
   * semiImplicitEuler updates an objects position and velocity for the given
   * time-step.
   * @param {Object} s a THREE.Vector3 object representing initial position.
   * @param {Object} v a THREE.Vector3 object representing initial velocity.
   * @param {Object} a a THREE.Vector3 object representing velocity.
   * @param {Number} dt Delta time - change in time since the last time-step.
   */
  semiImplicitEuler: function (s,v,a,dt) {
    this.updateVelocity(v,a,dt);
    this.updatePosition(s,v,dt);
  },

  /**
   * updateEntity updates an entities position and velocity using semi-implicit
   * euler.
   * @param {Object} e an Entity object.
   * @param {Number} dt Delta time - change in time since the last time-step.
   */
  updateEntity: function (e, dt) {
    this.semiImplicitEuler(e.position, e.velocity, e.acceleration, dt);
  },

  /**
   * collisionCheckCircle checks two circles for a collision.
   * if false, the function returns an object with the collision flag set to false.
   * if true, the function returns an object with the collision flag set to true,
   * also with the collision data P, p and N. P is the nearest point of contact,
   * p is the penetration depth and N is the collision normal.
   * @param {Object} c1 an Entity object (specifically a circle).
   * @param {Object} c2 an Entity object (specifically a circle).
   */
  collisionCheckCircle: function (c1, c2) {
    var d2 = Math.pow(c2.position.x - c1.position.x, 2) +
             Math.pow(c2.position.y - c1.position.y, 2) +
             Math.pow(c2.position.z - c1.position.z, 2);
    var p = Math.pow(c1.radius + c2.radius, 2);
    if (Math.pow(c1.radius + c2.radius, 2) < d2) return { collision: false };
    else {
      p = p - d2;
      var N = c1.position.clone().sub(c2.position).normalize();
      var P = c1.position.clone().sub(N.clone().multiplyScalar(c1.radius - p));
      return {collision: true, P: P, p: p, N: N};
    }
  },

  /**
   * collisionResponseCircle handles the collision response for two circles. the
   * collision response uses the impulse method, therefore modifies velocity
   * of both objects involved in the collision.
   * @param {Object} c1 an Entity object (specifically a circle).
   * @param {Object} c2 an Entity object (specifically a circle).
   * @param {Object} data The collision data object.
   */
  collisionResponseCircle: function (c1, c2, data) {
    //untangle
    //c1.position.add(data.N.clone().multiplyScalar(data.p));

    var Vab = c1.velocity.clone().add(c2.velocity);
    var Vn  = Vab.dot(data.N);

    const e = 0.95;

    var Jtop = (-1 * (1 + e) * Vn);
    var Jbottom = data.N.dot(data.N.clone().multiplyScalar(c1.inverse_mass + c2.inverse_mass));
    var J = Jtop / Jbottom;

    c1.velocity.add(data.N.clone().multiplyScalar(c1.inverse_mass * J));
    c2.velocity.sub(data.N.clone().multiplyScalar(c2.inverse_mass * J));
  },

  /**
   * elasticity applies elasticity between two entities.
   * @param {Object} a An Entity object.
   * @param {Object} b An Entity object.
   * @param {Number} k The spring resistance (how stiff the spring is).
   * @param {Number} c The coefficent of elasticity.
   * @param {Number} dt Delta time - change in time since the last time-step.
   * @param {Number} length The resting length of the spring.
   */
  elasticity: function (a, b, k, c, dt, length) {
    // x = difference in current position from rest position
    var x = length - a.position.distanceTo(b.position);
    // force
    var f = -1 * (k * x) - b.velocity.clone().multiplyScalar(c).length();
    var vab = b.position.clone();
    vab.sub(a.position);
    vab.multiplyScalar(f);

    a.acceleration.add(vab.divideScalar(a.mass));
  }
}

// var verlet = function (e, dt) {
//   var position = e.position.clone();
//   position.add(e.position.clone().sub(e.lposition)).add(e.acceleration.clone().multiplyScalar(dt * dt));
//   e.llposition = e.lposition;
//   e.lposition = e.position;
//   e.position = position;
// }

module.exports = Physics;
