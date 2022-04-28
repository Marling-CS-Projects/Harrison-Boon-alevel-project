import type { Box } from "src/objects/box";

function isAboveFloor(box: Box) {
  return (
    box.position.x > -5.5 &&
    box.position.x < 5.5 &&
    box.position.z > -5.5 &&
    box.position.z < 5.5 &&
    box.position.y >= 0
  );
}

export { isAboveFloor };
