import * as THREE from "three";
export function spawnPoints(n: number, planeGeometry: THREE.PlaneGeometry) {
  const points: THREE.Mesh[] = [];
  const pointGeometry = new THREE.SphereGeometry(2);
  const pointMaterial = new THREE.MeshLambertMaterial({ color: 0x0022ff });
  const limits = planeGeometry.attributes.position.array.length / 3;
  for (let i = 0; i < n; i++) {
    const random = Math.floor(Math.random() * limits);
    const x = planeGeometry.attributes.position.array[random * 3];
    const y = planeGeometry.attributes.position.array[random * 3 + 2];
    const z = planeGeometry.attributes.position.array[random * 3 + 1];
    const mesh = new THREE.Mesh(pointGeometry, pointMaterial);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = -z;
    points.push(mesh);
  }
  return { points };
}
