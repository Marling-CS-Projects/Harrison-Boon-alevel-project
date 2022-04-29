import * as THREE from "three";
import type { Box } from "../objects/box";
import { accelerationDTG, playerSpeed } from "../utils";
import { isAboveFloor } from "./isAboveFloor";

function moveBox(
  box: Box,
  camera: THREE.PerspectiveCamera,
  keyMap: Record<string, boolean>
) {
  box.velocity -= accelerationDTG;
  if (box.position.y > 0.5 * box.scale.y - box.velocity || !isAboveFloor(box)) {
    box.position.y += box.velocity;
  } else {
    keyMap["jump"] = false;
    box.velocity = 0;
    box.position.y = 0.5 * box.scale.y - box.velocity;
  }
  if (!box.isAlive) return;

  const forward = new THREE.Vector2(
    camera.position.x - box.position.x,
    camera.position.z - box.position.z
  );
  const keyCount = Object.keys(keyMap).filter(
    (key) =>
      keyMap[key] && ["w", "W", "s", "S", "a", "A", "d", "D"].includes(key)
  ).length;
  forward
    .normalize()
    .multiplyScalar(keyCount === 2 ? playerSpeed / Math.sqrt(2) : playerSpeed);

  if (keyMap["w"] || keyMap["W"]) {
    box.position.x += -forward.x;
    box.position.z += -forward.y;
  }
  if (keyMap["s"] || keyMap["S"]) {
    box.position.x += forward.x;
    box.position.z += forward.y;
  }
  if (keyMap["a"] || keyMap["A"]) {
    box.position.x += -forward.y;
    box.position.z += forward.x;
  }
  if (keyMap["d"] || keyMap["D"]) {
    box.position.x += forward.y;
    box.position.z += -forward.x;
  }
}

export { moveBox };
