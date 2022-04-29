import type { Box } from "src/objects/box";

function checkSpike(
  box: Box,
  spikes: THREE.Mesh[],
  growBox: { frame: number; target: number; delay: number }
) {
  for (let i = 0; i < spikes.length; i++) {
    if (
      box.position.x > spikes[i].position.x - 0.75 &&
      box.position.x < spikes[i].position.x + 0.75 &&
      box.position.z > spikes[i].position.z - 0.75 &&
      box.position.z < spikes[i].position.z + 0.75 &&
      box.position.y > spikes[i].position.y - (0.25 + 0.5 * box.scale.y) &&
      box.position.y < spikes[i].position.y + (0.25 + 0.5 * box.scale.y)
    ) {
      box.isAlive = false;
      setTimeout(() => {
        box.isAlive = true;
      }, 2000);
      return growBox.frame ? growBox : { frame: 1, target: 0, delay: 0 };
    }
  }
}

export { checkSpike };
