var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var material = new THREE.MeshBasicMaterial( { color: 0x111199 } );
var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 0, 1, 0 )
);
var mesh = new THREE.Line(geometry, material);
scene.add( mesh );

camera.position.z = 5;


// physics



// rendering

var render = function () {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();
