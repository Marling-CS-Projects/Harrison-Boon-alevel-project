import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
const accelerationDTG = 0.1;
const playerSpeed = 0.1;

const keyMap: Record<string, boolean> = { jump: false };
document.addEventListener("keydown", (e) => {
  keyMap[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keyMap[e.key] = false;
});

// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");
if (!canvas)
  throw Error(
    "Could not find canvas.webgl canvas in the document. Did you use the correct selector?"
  );

// Scene
const scene = new THREE.Scene();

// Box
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshLambertMaterial({ color: 0xff0044 })
);
box.position.y = 1;
let boxVelocity = 0;

scene.add(box);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 20),
  new THREE.MeshLambertMaterial({
    color: 0xf3d09b,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

const hemisphereLight = new THREE.HemisphereLight(0xb0d6f5, 0xf3d09b, 1);
scene.add(hemisphereLight);
const directionalLight = new THREE.DirectionalLight(0xeedca5);
directionalLight.position.set(5, 10, 10);
scene.add(directionalLight);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target = box.position;
controls.update();
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0c164f);

directionalLight.castShadow = true;
directionalLight.shadow.camera = new THREE.OrthographicCamera(
  -10,
  10,
  10,
  -10,
  0.1,
  100
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
floor.receiveShadow = true;
box.castShadow = true;

function moveBox() {
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

  if (box.position.y > 1 - boxVelocity) {
    box.position.y += boxVelocity;
    camera.position.y += boxVelocity;
  } else {
    keyMap["jump"] = false;
    boxVelocity = 0;
    box.position.y = 1;
  }
}
function jump() {
  if (keyMap[" "] && !keyMap["jump"]) {
    keyMap["jump"] = true;
    boxVelocity = 10;
    box.position.y += boxVelocity;
    camera.position.y += boxVelocity;
  }
}

const tick = () => {
  moveBox();
  jump();
  boxVelocity -= accelerationDTG;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
