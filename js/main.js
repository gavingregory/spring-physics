var Entity = require('./models/entity')
  , StaticEntity = require('./models/static-entity')
  , Spring = require('./models/spring')
  , physics = require('./models/physics');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var renderer = new THREE.WebGLRenderer();
var material = new THREE.MeshBasicMaterial( { color: 0x111199 } );

renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 400;

// input test
document.addEventListener('mousedown', function () {
  circle.velocity.add(new THREE.Vector3(12,0,0));
}, false);

var circle = new Entity(new THREE.Vector3(0,-3,0));
var circle2 = new Entity(new THREE.Vector3(25,0,0));
scene.add(circle.mesh);
scene.add(circle2.mesh);

// var spring = new Spring(circle, circle2, 1, 50.0);
// spring.b.acceleration.set(0,0,0);
// scene.add(spring.mesh);

var planeGeometry = new THREE.PlaneGeometry(500,500,2);
var plane = new THREE.Mesh(planeGeometry, new THREE.MeshLambertMaterial( { color: 0x88ff88 } ));
plane.position.set(0,0,-5);
scene.add(plane);

var dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(100, 100, 50);
scene.add(dirLight);

// rendering
var clock = new THREE.Clock(true);
var render = function () {
  var dt = clock.getDelta();
  physics.updateEntity(circle, dt);
  physics.updateEntity(circle2, dt);
  //physics.elasticity(spring.a, spring.b, spring.resistance, 0.99, dt, 80);
  //spring.geometry.verticesNeedUpdate = true;
  circle.mesh.position.copy(circle.position);
  circle2.mesh.position.copy(circle2.position);
  var result = physics.collisionCheckCircle(circle, circle2);
  if (result.collision) physics.collisionResponseCircle(circle, circle2, result);
  scene.add(circle.mesh);

  requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
