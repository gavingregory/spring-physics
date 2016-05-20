function dampenedHookeForce(displacement, velocity, stiffness, damping) {
  // Hooke's Law -- the basic spring force.
  // <http://en.wikipedia.org/wiki/Hooke%27s_law>
  //
  //     F = -kx
  //
  // Where:
  // x is the vector displacement of the end of the spring from its equilibrium,
  // k is a constant describing the tightness of the spring.
  var hookeForce = -1 * (stiffness * displacement);

  // Applying friction to Hooke's Law for realistic physics
  // <http://gafferongames.com/game-physics/spring-physics/>
  //
  //     F = -kx - bv
  //
  // Where:
  // b is damping (friction),
  // v is the relative velocity between the 2 points.
  return hookeForce - (damping * velocity);
}

function particle(x, velocity, mass) {
  return {
    x: x || 0,
    velocity: velocity || 0,
    mass: mass || 1
  };
}

function tick(particle, stiffness, damping) {
  // "Tick" a particle given a spring force.
  // Mutates the particle object!
  var force = dampenedHookeForce(
    particle.x,
    particle.velocity,
    stiffness,
    damping
  );

  // Acceleration = force / mass.
  var acceleration = force / particle.mass;

  // Increase velocity by acceleration.
  particle.velocity += acceleration;
  // Update distance from resting.
  particle.x += particle.velocity / 100;

  return particle;
}

function isParticleResting(particle) {
  // Find out if a particle is at rest.
  // Returns a boolean.
  return Math.round(particle.x) === 0 && Math.abs(particle.velocity) < 0.2;
}

function accumulateCurvePoints(x, velocity, mass, stiffness, damping) {
  // Accumulate all states of a spring as an array of points.
  // Returns an array representing x values over time..

  // Create a temporary particle object.
  var p = particle(x, velocity, mass);

  // Create a points array to accumulate into.
  var points = [];

  while(!isParticleResting(p)) {
    points.push(tick(p, stiffness, damping).x);
  }

  return points;
}

var points = accumulateCurvePoints(0, 500, 1, 1, 0.5);
console.log(points);
