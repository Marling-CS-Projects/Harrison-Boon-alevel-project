import "./style.css.proxy.js";
import * as THREE from "../snowpack/pkg/three.js";
import {OrbitControls} from "../snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "../snowpack/pkg/cannon-es.js";
import {terrainGenerate} from "./terrainGenerate.js";
const gravity = -9.8;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e4);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(983065);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, gravity, 0)
});
const ambientLighting = new THREE.AmbientLight(11184810);
const directionalLighting = new THREE.DirectionalLight(16777215);
directionalLighting.position.set(0, 50, 0);
directionalLighting.castShadow = true;
directionalLighting.shadow.camera.top = 250;
directionalLighting.shadow.camera.bottom = -250;
directionalLighting.shadow.camera.left = -250;
directionalLighting.shadow.camera.right = 250;
directionalLighting.shadow.camera.far = 500;
directionalLighting.shadow.mapSize = new THREE.Vector2(16384, 16384);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const sphereMaterial = new CANNON.Material();
const sphereBody = new CANNON.Body({
  mass: 1,
  material: sphereMaterial,
  position: new CANNON.Vec3(0, 20, 0)
});
sphereBody.addShape(new CANNON.Sphere(0.5));
const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), new THREE.MeshLambertMaterial({
  color: 16711748
}));
sphereMesh.castShadow = true;
controls.target.set(sphereMesh.position.x, sphereMesh.position.y, sphereMesh.position.z);
const groundMaterial = new CANNON.Material("ground");
const {trimeshBody, planeGeometry, colours} = terrainGenerate(Math.random().toString(), groundMaterial);
world.addBody(trimeshBody);
const planeMaterial = new THREE.MeshPhongMaterial({
  vertexColors: true,
  reflectivity: 0.5,
  shininess: 0,
  flatShading: true
});
planeGeometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colours), 3));
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.castShadow = true;
planeMesh.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {friction: 0.5});
world.addBody(sphereBody);
world.addContactMaterial(contactMaterial);
scene.add(sphereMesh);
scene.add(ambientLighting);
scene.add(directionalLighting);
scene.add(planeMesh);
const clock = new THREE.Clock();
function animate() {
  renderer.render(scene, camera);
  world.step(clock.getDelta());
  if (sphereBody.position.y < -50) {
    sphereBody.position = new CANNON.Vec3(0, 20, 0);
    sphereBody.velocity = new CANNON.Vec3(0, 0, 0);
    sphereBody.angularVelocity = new CANNON.Vec3(0, 0, 0);
  }
  sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
  sphereMesh.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w);
  window.requestAnimationFrame(animate);
}
animate();
