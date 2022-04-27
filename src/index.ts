import "./style.css";
import * as THREE from "three";

import { directionalLight } from "./lighting/directionalLight";
import { hemisphereLight } from "./lighting/hemisphereLight";
import { camera } from "./camera/camera";
import { controls } from "./camera/controls";
import { renderer } from "./rendering/renderer";
import { box } from "./objects/box";
import { floor } from "./objects/floor";
import { food } from "./objects/food";
import { moveBox } from "./functions/moveBox";
import { jump } from "./functions/jump";
import { boxAnimate } from "./functions/boxAnimate";
import { checkCollision } from "./functions/checkCollision";

let growBox = { frame: 0, target: 0 };

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

controls.target = box.position;
controls.update();

const tick = () => {
  moveBox(box, floor, camera, controls, keyMap);
  jump(box, camera, keyMap);
  growBox = checkCollision(box, food) || growBox;
  growBox = boxAnimate(box, floor, camera, growBox);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
