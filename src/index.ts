import "./style.css";
import * as THREE from "three";

import { directionalLight } from "./lighting/directionalLight";
import { hemisphereLight } from "./lighting/hemisphereLight";
import { camera } from "./camera/camera";
import { renderer } from "./rendering/renderer";
import { box } from "./objects/box";
import { floor } from "./objects/floor";
import { food } from "./objects/food";
import { spikes } from "./objects/spikes";
import { moveBox } from "./functions/moveBox";
import { jump } from "./functions/jump";
import { boxAnimate } from "./functions/boxAnimate";
import { checkFood } from "./functions/checkFood";
import { checkDeath } from "./functions/checkDeath";
import { checkSpike } from "./functions/checkSpike";

let boxAnimation = { frame: 0, target: 0, delay: 0 };

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("/assets/Tromboing.mp3", function (buffer) {
  sound.setBuffer(buffer);
});

const keyMap: Record<string, boolean> = { jump: false };
document.addEventListener("keydown", (e) => {
  keyMap[e.key] = true;
  if (e.key == " ") sound.play();
});
document.addEventListener("keyup", (e) => {
  keyMap[e.key] = false;
});

const scene = new THREE.Scene();

scene.add(box);
scene.add(floor);
scene.add(food);
spikes.forEach((spike) => {
  scene.add(spike);
});
scene.add(hemisphereLight);
scene.add(directionalLight);
scene.add(camera);
camera.lookAt(box.position);

const tick = () => {
  moveBox(box, camera, keyMap);
  jump(box, keyMap);
  boxAnimation = checkFood(box, food) || boxAnimation;
  console.log("a" + boxAnimation.frame);
  boxAnimation = checkSpike(box, spikes, boxAnimation) || boxAnimation;
  console.log("af" + boxAnimation.frame);
  boxAnimation = checkDeath(box) || boxAnimation;
  console.log("mid" + boxAnimation.frame);
  boxAnimation = boxAnimate(box, boxAnimation);
  console.log("post" + boxAnimation.frame);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
