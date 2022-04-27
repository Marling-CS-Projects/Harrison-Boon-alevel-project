import * as THREE from "three";

const food = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshLambertMaterial({ color: 0x00ff00 })
);
food.position.y = 0.25;
food.position.x = Math.random() > 0.5 ? -1 : 1 * (Math.random() * 5 + 1);
food.position.z = Math.random() > 0.5 ? -1 : 1 * (Math.random() * 5 + 1);

export { food };
