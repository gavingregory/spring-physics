/**
 * Represents an position in space.
 * @constructor
 * @param {Object} position - A THREE.Vector3 object representing position. Optional.
 * @param {Number} mass - The mass of the object. Optional.
 */
var Entity = function (position, mass) {
  if (position) this.position = position; else this.position = new THREE.Vector3();
  if (mass) this.mass = mass; else this.mass = 0.5;
  this.acceleration = new THREE.Vector3(0, -9.81 * mass, 0);
  this.velocity = new THREE.Vector3();
  this.lposition = this.position.clone();
  this.llposition = this.position.clone();
};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshBasicMaterial( { color: 0x111199 } );

/**
 * Represents a static entity.
 * @constructor
 * @param {Object} position - A THREE.Vector3 object representing position. Optional.
 * @param {Object} entity - The Entity object that it is attached to.
 */
 var StaticEntity = function (position, entity) {
   if (position) this.position = position; else this.position = new THREE.Vector3();
   if (entity) this.entity = entity; else this.entity = null;
 }

/**
 * Represents a spring.
 * @constructor
 * @param {Object} a - An Entity object representing position. Optional.
 * @param {Object} b - The mass of the object.
 * @param {Number} resistance - The resistance of the spring.
 * @param {Number} length - The length of the spring.
 */
var Spring = function (a, b, resistance, length) {
  this.a = a;
  this.b = b;
  this.resistance = resistance;
  this.length = length;
};

var spring = new Spring(new Entity(new THREE.Vector3(0,0,0), 0.5), new Entity(new THREE.Vector3(0,90,0), 0.5), 1, 50.0);
//spring.b.acceleration.set(0,0,0);
camera.position.z = 500;

// physics

var verlet = function (e, dt) {
  var position = e.position.clone();
  position.add(e.position.clone().sub(e.lposition)).add(e.acceleration.clone().multiplyScalar(dt * dt));
  e.llposition.copy(e.lposition);
  e.lposition.copy(e.position);
  e.position.copy(position);
  e.velocity = e.position.clone().sub(e.lposition).divideScalar(dt); // inefficient to calculate this twice really!
}



// a  = Entity a
// b  = Entity b
// k  = Spring resistance
// c  = Coefficient of elasticity
// dt = Delta Time
var hookeForce = function (a, b, k, c, dt) {
  var x = a.position.distanceTo(b.position) - spring.length;
  var force = -1 * (k*x); // Hookes Law: F = -kx;

  // Vab
  var vab = a.position.clone();
  vab.sub(b.position);

  var N = vab.clone().normalize();
  var v = N.dot(vab);
  force -= v*c;

  return force;
};

// input test
document.addEventListener('mousedown', function () {
  spring.a.acceleration = spring.a.acceleration.add(new THREE.Vector3(1,0,0));
}, false);

var geometry = new THREE.Geometry();
//geometry.vertices.push(spring.a.position, spring.b.position);
var mesh = new THREE.Line(geometry, material);
var circleAGeometry = new THREE.CircleGeometry(5,6);
var circleBGeometry = new THREE.CircleGeometry(5,6);
circleAGeometry.verticesNeedUpdate = true;
circleBGeometry.verticesNeedUpdate = true;
var circleA = new THREE.Mesh(circleAGeometry, material);
var circleB = new THREE.Mesh(circleBGeometry, material);

// rendering
var clock = new THREE.Clock(true);
var render = function () {
  //var dt = clock.getDelta();
  var dt = 0.001;
  var f = hookeForce(spring.a, spring.b, 500, 0.9, dt);
  spring.a.acceleration.multiplyScalar(f /spring.a.mass);
  console.log(f);
  //updateVelocityAndPosition(spring.a, dt);
  verlet(spring.a, dt);
  verlet(spring.b, dt);
  geometry.vertices = [];
  geometry.vertices.push(spring.a.position, spring.b.position);
  geometry.verticesNeedUpdate = true;
  circleA.position.copy(spring.a.position);
  circleB.position.copy(spring.b.position);
  scene.add( mesh );
  scene.add(circleA);
  scene.add(circleB);

  requestAnimationFrame( render );
	renderer.render( scene, camera );

  mesh.geometry.dispose();
  mesh.material.dispose();
  scene.remove(mesh);
}
render();
