import type * as THREE from "three";
export function detectCollision(points: THREE.Mesh[], vehicleMesh: THREE.Mesh) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (
      point.position.x + 2 > vehicleMesh.position.x - 4 &&
      point.position.x - 2 < vehicleMesh.position.x + 4 &&
      point.position.y + 2 > vehicleMesh.position.y - 0.5 &&
      point.position.y - 2 < vehicleMesh.position.y + 0.5 &&
      point.position.z + 2 > vehicleMesh.position.z - 4 &&
      point.position.z - 2 < vehicleMesh.position.z + 4
    ) {
      return point;
    }
  }
}
