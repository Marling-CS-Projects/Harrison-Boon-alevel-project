import type { Box } from "src/objects/box";
import { isBelowFloor } from "./isBelowFloor";

function boxAnimate(
  box: Box,
  floor: THREE.Mesh,
  camera: THREE.PerspectiveCamera,
  growBox: { frame: number; target: number }
) {
  growBox = isBelowFloor(box, floor, camera) || growBox;

  if (growBox.frame) {
    const scaler = growBox.frame / 60;
    box.scale.y += (growBox.target - box.scale.y) * scaler;
    box.position.y += (growBox.target - box.scale.y) * (scaler / 2);
    growBox.frame++;
    if (box.scale.y == growBox.target) {
      growBox.frame = 0;
    }
  }
  return growBox;
}

export { boxAnimate };
