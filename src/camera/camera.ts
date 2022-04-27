import * as THREE from "three";
import { sizes } from "../utils";

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 10;
camera.position.z = 10;
camera.position.y = 10;

export { camera };
