import "./style.css.proxy.js";
import * as THREE from "../snowpack/pkg/three.js";
import {OrbitControls} from "../snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "../snowpack/pkg/cannon-es.js";
const gravity = -9.8;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(983065);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, gravity, 0)
});
const ambientLighting = new THREE.AmbientLight(11184810);
const directionalLighting = new THREE.DirectionalLight(16777215);
directionalLighting.position.set(-5, 5, 5);
directionalLighting.castShadow = true;
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const sphereMaterial = new CANNON.Material();
const sphereBody = new CANNON.Body({
  mass: 1,
  material: sphereMaterial,
  position: new CANNON.Vec3(0, 5, -2)
});
sphereBody.addShape(new CANNON.Sphere(0.5));
const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), new THREE.MeshLambertMaterial({
  color: 16711748
}));
sphereMesh.castShadow = true;
const groundMaterial = new CANNON.Material("ground");
const groundBody = new CANNON.Body({mass: 0, material: groundMaterial});
groundBody.addShape(new CANNON.Box(new CANNON.Vec3(2, 4, 0.1)));
groundBody.quaternion.setFromEuler(-Math.PI / 3, 0, 0);
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 8), new THREE.MeshLambertMaterial({color: 16777215}));
planeMesh.quaternion.set(groundBody.quaternion.x, groundBody.quaternion.y, groundBody.quaternion.z, groundBody.quaternion.w);
planeMesh.position.set(groundBody.position.x, groundBody.position.y + 0.1, groundBody.position.z);
planeMesh.receiveShadow = true;
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {friction: 0.9, restitution: 0.5});
world.addBody(sphereBody);
world.addBody(groundBody);
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
    sphereBody.position = new CANNON.Vec3(0, 5, -2);
    sphereBody.velocity = new CANNON.Vec3(0, 0, 0);
    sphereBody.angularVelocity = new CANNON.Vec3(0, 0, 0);
  }
  sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
  sphereMesh.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w);
  window.requestAnimationFrame(animate);
}
animate();