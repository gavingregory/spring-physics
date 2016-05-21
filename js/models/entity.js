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

  // rendering stuff
  this.radius = 5;
  this.triangles = 32;
  this.material = new THREE.MeshBasicMaterial( { color: 0x111199 } );
  this.geometry = new THREE.CircleGeometry(this.radius, this.triangles);
  this.geometry.verticesNeedUpdate = true;
  this.mesh = new THREE.Mesh(this.geometry, this.material);
};

module.exports = Entity;
