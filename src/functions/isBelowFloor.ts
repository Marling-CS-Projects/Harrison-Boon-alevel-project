import type { Box } from "src/objects/box";

function isBelowFloor(
  box: Box,
  floor: THREE.Mesh,
  camera: THREE.PerspectiveCamera
): { frame: number; target: number } | null {
  const boxHeight = 1 * box.scale.y;
  if (box.position.y < floor.position.y - boxHeight - 20) {
    camera.position.x = camera.position.x - box.position.x;
    camera.position.z = camera.position.z - box.position.z;
    camera.position.y = camera.position.y - box.position.y + 40;
    box.position.x = 0;
    box.position.z = 0;
    box.position.y = 40;
    return { frame: 1, target: 1 };
  }
  return null;
}

export { isBelowFloor };
