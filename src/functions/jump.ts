import type { Box } from "src/objects/box";

function jump(
  box: Box,
  camera: THREE.PerspectiveCamera,
  keyMap: Record<string, boolean>
) {
  if (keyMap[" "] && !keyMap["jump"]) {
    keyMap["jump"] = true;
    box.velocity = 0.2;
    box.position.y += box.velocity;
    camera.position.y += box.velocity;
  }
}

export { jump };
