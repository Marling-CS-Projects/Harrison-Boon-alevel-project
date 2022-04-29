import type { Box } from "src/objects/box";

function boxAnimate(
  box: Box,
  growBox: { frame: number; target: number; delay: number }
) {
  if (growBox.frame) {
    if (growBox.frame > growBox.delay) {
      const scaler = (growBox.frame - growBox.delay) / 60;
      box.scale.y += (growBox.target - box.scale.y) * scaler;
      box.position.y += (growBox.target - box.scale.y) * (scaler / 2);
      if (box.scale.y < 0.01) {
        growBox.frame = -1;
        box.scale.y = 1;
        box.position.y = 40;
        box.position.x = 0;
        box.position.z = 0;
      }
      if (box.scale.y == growBox.target) {
        growBox.frame = -1;
      }
    }
    growBox.frame++;
  }
  return growBox;
}

export { boxAnimate };
