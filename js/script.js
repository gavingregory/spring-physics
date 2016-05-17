var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshBasicMaterial( { color: 0x111199 } );
var geometry = new THREE.Geometry();


var Entity = function (position, mass) {

  if (position) this.position = position;
  else this.position = new THREE.Vector3();

  if (mass) this.mass = mass;
  else this.mass = 1.0;

  this.acceleration = new THREE.Vector3();
  this.velocity = new THREE.Vector3();

};

// Spring Object
var Spring = function (a, b, resistance, length) {
  this.a = a;
  this.b = b;
  this.resistance = resistance;
  this.length = length;
};

var spring = new Spring(new Entity(new THREE.Vector3(0,0,0), 1.0), new Entity(new THREE.Vector3(0,2,0), 1.0), 1.0, 1.0);

geometry.vertices.push(spring.a.position, spring.b.position);
var mesh = new THREE.Line(geometry, material);
scene.add( mesh );

camera.position.z = 5;

// physics
var elasticity = function (spring, elasticity) {

  // k = spring constant (how resistant is the spring?)
  var k = spring.resistance;

  // c = coefficient of elasticity
  var c = elasticity;

  // x = difference in current position from rest position
  var x = spring.length - spring.a.position.distanceTo(spring.b.position);

  //var F = -(k * x) - (c * v);
};

elasticity(spring, 0.99);

// rendering
var clock = new THREE.Clock(true);
var render = function () {
  var dt = clock.getDelta();
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();
