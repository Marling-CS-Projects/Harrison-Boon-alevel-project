import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { camera } from "./camera";
import { canvas } from "../rendering/canvas";
const controls = new OrbitControls(camera, canvas!);
controls.maxDistance = 15;
controls.minPolarAngle = Math.PI / 6;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
controls.enableDamping = true;

export { controls };
