import "./style.css";
import * as THREE from "three";

import { directionalLight } from "./lighting/directionalLight";
import { hemisphereLight } from "./lighting/hemisphereLight";
import { camera } from "./camera/camera";
import { renderer } from "./rendering/renderer";
import { box } from "./objects/box";
import { floor } from "./objects/floor";
import { food } from "./objects/food";
import { moveBox } from "./functions/moveBox";
import { jump } from "./functions/jump";
import { boxAnimate } from "./functions/boxAnimate";
import { checkCollision } from "./functions/checkCollision";
import { checkDeath } from "./functions/checkDeath";

let boxAnimation = { frame: 0, target: 0, delay: 0 };

const keyMap: Record<string, boolean> = { jump: false };
document.addEventListener("keydown", (e) => {
  keyMap[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keyMap[e.key] = false;
});

const scene = new THREE.Scene();

scene.add(box);
scene.add(floor);
scene.add(food);
scene.add(hemisphereLight);
scene.add(directionalLight);
scene.add(camera);
camera.lookAt(box.position);

const tick = () => {
  moveBox(box, camera, keyMap);
  jump(box, keyMap);
  boxAnimation = checkCollision(box, food) || boxAnimation;
  boxAnimation = checkDeath(box) || boxAnimation;
  boxAnimation = boxAnimate(box, boxAnimation);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
