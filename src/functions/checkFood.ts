import type { Box } from "src/objects/box";
import { spikes } from "../objects/spikes";

function checkFood(box: Box, food: THREE.Mesh) {
  if (
    box.position.x > food.position.x - 0.75 &&
    box.position.x < food.position.x + 0.75 &&
    box.position.z > food.position.z - 0.75 &&
    box.position.z < food.position.z + 0.75 &&
    box.position.y > food.position.y - (0.25 + 0.5 * box.scale.y) &&
    box.position.y < food.position.y + (0.25 + 0.5 * box.scale.y)
  ) {
    food.position.x = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 4 + 1);
    food.position.z = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 4 + 1);
    spikes.forEach((spike) => {
      do {
        spike.position.x =
          (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 4 + 1);
        spike.position.z =
          (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 4 + 1);
      } while (
        spike.position.x > box.position.x - 0.75 &&
        spike.position.x < box.position.x + 0.75 &&
        spike.position.z > box.position.z - 0.75 &&
        spike.position.z < box.position.z + 0.75
      );
    });
    return { frame: 1, target: box.scale.y + 0.5, delay: 0 };
  }
}

export { checkFood };
