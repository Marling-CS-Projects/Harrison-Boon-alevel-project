import type { Box } from "src/objects/box";

function checkDeath(box: Box) {
  if (box.position.y < -40) {
    box.position.y = 20;
    box.position.z = 0;
    box.position.x = 0;
    return { frame: 1, target: 1, delay: 40 };
  }
}

export { checkDeath };
