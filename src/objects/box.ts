import * as THREE from "three";

class Box extends THREE.Mesh {
  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    super(geometry, material);
  }
  velocity: number = 0;
  isAlive: boolean = true;
}
const box = new Box(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshLambertMaterial({ color: 0xff0044 })
);
box.position.y = 0.5 * box.scale.y;
box.velocity = 0;
box.castShadow = true;

export { box, Box };
