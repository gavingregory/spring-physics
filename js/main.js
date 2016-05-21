var Entity = require('./models/entity')
  , StaticEntity = require('./models/static-entity')
  , Spring = require('./models/spring');


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var renderer = new THREE.WebGLRenderer();
var material = new THREE.MeshBasicMaterial( { color: 0x111199 } );

renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var spring = new Spring(new Entity(new THREE.Vector3(0,0,0), 0.5), new Entity(new THREE.Vector3(0,50,0), 0.5), 1, 50.0);
spring.b.acceleration.set(0,0,0);
camera.position.z = 50;

// physics

var updateVelocity = function (v, a, dt) {
  v.add(a.clone().multiplyScalar(dt));
  v.multiplyScalar(0.99); // damping
}

var updatePosition = function (s, v, dt) {
  s.add(v.clone().multiplyScalar(dt));
}

var semiImplicitEuler = function (s,v,a,dt) {
  updateVelocity(v,a,dt);
  updatePosition(s,v,dt);
}

var updateCircle = function (c, dt) {
  semiImplicitEuler(c.position, c.velocity, c.acceleration, dt);
}

var collisionCheckCircle = function (c1, c2) {
  var d2 = Math.pow(c2.position.x - c1.position.x, 2) +
           Math.pow(c2.position.y - c1.position.y, 2) +
           Math.pow(c2.position.z - c1.position.z, 2);
  if (Math.pow(c1.radius + c2.radius, 2) < d2) return false;
  else return true;
}

var verlet = function (e, dt) {
  var position = e.position.clone();
  position.add(e.position.clone().sub(e.lposition)).add(e.acceleration.clone().multiplyScalar(dt * dt));
  e.llposition = e.lposition;
  e.lposition = e.position;
  e.position = position;
}

// a  = Entity a
// b  = Entity b
// k  = Spring resistance
// c  = Coefficient of elasticity
// dt = Delta Time
var elasticity = function (a, b, k, c, dt) {
  // x = difference in current position from rest position
  var x = spring.length - a.position.distanceTo(b.position);
  // force
  var f = -(k * x) - b.velocity.clone().multiplyScalar(c).length();
  var vab = a.position.clone();
  vab.sub(b.position);
  vab.multiplyScalar(f);
  return vab;
};

// input test
document.addEventListener('mousedown', function () {
  circle.velocity.add(new THREE.Vector3(1,0,0));
}, false);

var circle = new Entity(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
var circle2 = new Entity(new THREE.Vector3(25,0,0), new THREE.Vector3(0,0,0));
scene.add(circle.mesh);
scene.add(circle2.mesh);

// rendering
var clock = new THREE.Clock(true);
var render = function () {
  var dt = clock.getDelta();
  updateCircle(circle, dt);
  updateCircle(circle2, dt);
  circle.mesh.position.copy(circle.position);
  circle2.mesh.position.copy(circle2.position);
  var result = collisionCheckCircle(circle, circle2);
  if (result) console.log(result);
  scene.add(circle.mesh);
  requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();
