import * as THREE from "three";

const directionalLight = new THREE.DirectionalLight(0xeedca5);
directionalLight.castShadow = true;

directionalLight.position.set(5, 10, 10);
const d = 10;

directionalLight.shadow.camera.left = -d;
directionalLight.shadow.camera.right = d;
directionalLight.shadow.camera.top = d;
directionalLight.shadow.camera.bottom = -d;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

export { directionalLight };
