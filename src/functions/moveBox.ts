import * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Box } from "../objects/box";
import { accelerationDTG, playerSpeed } from "../utils";
import { isAboveFloor } from "./isAboveFloor";

function moveBox(
  box: Box,
  floor: THREE.Mesh,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  keyMap: Record<string, boolean>
) {
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
    camera.position.x += -forward.x;
    box.position.x += -forward.x;
    camera.position.z += -forward.y;
    box.position.z += -forward.y;
  }
  if (keyMap["s"] || keyMap["S"]) {
    camera.position.x += forward.x;
    box.position.x += forward.x;
    camera.position.z += forward.y;
    box.position.z += forward.y;
  }
  if (keyMap["a"] || keyMap["A"]) {
    camera.position.x += -forward.y;
    box.position.x += -forward.y;
    camera.position.z += forward.x;
    box.position.z += forward.x;
  }
  if (keyMap["d"] || keyMap["D"]) {
    camera.position.x += forward.y;
    box.position.x += forward.y;
    camera.position.z += -forward.x;
    box.position.z += -forward.x;
  }

  controls.target = box.position;
  controls.update();

  if (
    box.position.y > 0.5 * box.scale.y - box.velocity ||
    !isAboveFloor(box, floor)
  ) {
    box.position.y += box.velocity;
    camera.position.y += box.velocity;
  } else {
    keyMap["jump"] = false;
    box.velocity = 0;
    box.position.y = 0.5 * box.scale.y - box.velocity;
  }
  box.velocity -= accelerationDTG;
}

export { moveBox };
