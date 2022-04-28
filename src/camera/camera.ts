import * as THREE from "three";
import { sizes } from "../utils";

const camera = new THREE.PerspectiveCamera(
  90,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = -7;
camera.position.z = 7;
camera.position.y = 7;

export { camera };
