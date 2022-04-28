import type { Box } from "src/objects/box";
import { isAboveFloor } from "./isAboveFloor";

function jump(box: Box, keyMap: Record<string, boolean>) {
  if (keyMap[" "] && !keyMap["jump"] && isAboveFloor(box)) {
    keyMap["jump"] = true;
    box.velocity = 0.2;
    box.position.y += box.velocity;
  }
}

export { jump };
