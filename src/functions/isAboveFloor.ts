import type { Box } from "src/objects/box";

function isAboveFloor(box: Box, floor: THREE.Mesh) {
  return (
    box.position.x > floor.position.x - 5.5 &&
    box.position.x < floor.position.x + 5.5 &&
    box.position.z > floor.position.z - 5.5 &&
    box.position.z < floor.position.z + 5.5 &&
    box.position.y >= 0
  );
}

export { isAboveFloor };
