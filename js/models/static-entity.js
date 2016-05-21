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

 module.exports = StaticEntity;
