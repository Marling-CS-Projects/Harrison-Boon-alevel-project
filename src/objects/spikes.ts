import * as THREE from "three";
import type { Mesh } from "three";

const spikes: Mesh[] = [];

for (let i = 0; i < 5; i++) {
  const spike = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshLambertMaterial({ color: 0x89cff0 })
  );
  spike.position.y = 0.25;
  spike.position.x = Math.random() > 0.5 ? -1 : 1 * (Math.random() * 4 + 1);
  spike.position.z = Math.random() > 0.5 ? -1 : 1 * (Math.random() * 4 + 1);
  spikes.push(spike);
}

export { spikes };
