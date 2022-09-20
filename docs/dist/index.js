import "./style.css.proxy.js";
import * as THREE from "../snowpack/pkg/three.js";
import {OrbitControls} from "../snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "../snowpack/pkg/cannon-es.js";
import {terrainGenerate} from "./terrainGenerate.js";
import {generateVehicle} from "./generateVehicle.js";
const gravity = -15;
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
const directionalLighting = new THREE.DirectionalLight(16777215, 0.7);
directionalLighting.position.set(400, 800, 600);
directionalLighting.castShadow = true;
directionalLighting.shadow.camera.top = 250;
directionalLighting.shadow.camera.bottom = -250;
directionalLighting.shadow.camera.left = -250;
directionalLighting.shadow.camera.right = 250;
directionalLighting.shadow.camera.far = 3e3;
directionalLighting.shadow.mapSize = new THREE.Vector2(16384, 16384);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const {
  vehicle,
  vehicleChassisBody,
  vehicleMesh,
  wheelBodies,
  wheelMeshes,
  wheelMaterial
} = generateVehicle();
vehicle.addToWorld(world);
const {trimeshBody, planeGeometry, groundMaterial} = terrainGenerate(Math.random().toString());
world.addBody(trimeshBody);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 10066329,
  reflectivity: 0.5,
  shininess: 0,
  flatShading: true
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.castShadow = true;
planeMesh.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, wheelMaterial, {friction: 0.8, restitution: 0.05});
world.addContactMaterial(contactMaterial);
scene.add(...wheelMeshes);
scene.add(vehicleMesh);
scene.add(ambientLighting);
scene.add(directionalLighting);
scene.add(planeMesh);
const clock = new THREE.Clock();
document.addEventListener("keydown", (event) => {
  const maxSteerVal = Math.PI / 8;
  const maxForce = 250;
  switch (event.key) {
    case "w":
    case "ArrowUp":
      vehicle.setWheelForce(maxForce, 2);
      vehicle.setWheelForce(-maxForce, 3);
      break;
    case "s":
    case "ArrowDown":
      vehicle.setMotorSpeed(-maxForce / 4, 0);
      vehicle.setMotorSpeed(maxForce / 4, 1);
      vehicle.setMotorSpeed(-maxForce / 4, 2);
      vehicle.setMotorSpeed(maxForce / 4, 3);
      break;
    case "a":
    case "ArrowLeft":
      vehicle.setSteeringValue(maxSteerVal, 0);
      vehicle.setSteeringValue(maxSteerVal, 1);
      break;
    case "d":
    case "ArrowRight":
      vehicle.setSteeringValue(-maxSteerVal, 0);
      vehicle.setSteeringValue(-maxSteerVal, 1);
      break;
  }
});
document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
    case "ArrowUp":
      vehicle.setWheelForce(0, 2);
      vehicle.setWheelForce(0, 3);
      break;
    case "s":
    case "ArrowDown":
      vehicle.disableMotor(0);
      vehicle.disableMotor(1);
      vehicle.disableMotor(2);
      vehicle.disableMotor(3);
      break;
    case "a":
    case "ArrowLeft":
      vehicle.setSteeringValue(0, 0);
      vehicle.setSteeringValue(0, 1);
      break;
    case "d":
    case "ArrowRight":
      vehicle.setSteeringValue(0, 0);
      vehicle.setSteeringValue(0, 1);
      break;
  }
});
function animate() {
  renderer.render(scene, camera);
  world.step(clock.getDelta());
  wheelMeshes.forEach((wheelMesh, i) => {
    wheelMesh.position.set(wheelBodies[i].position.x, wheelBodies[i].position.y, wheelBodies[i].position.z);
    wheelMesh.quaternion.set(wheelBodies[i].quaternion.x, wheelBodies[i].quaternion.y, wheelBodies[i].quaternion.z, wheelBodies[i].quaternion.w);
  });
  vehicleMesh.position.set(vehicleChassisBody.position.x, vehicleChassisBody.position.y - 0.5, vehicleChassisBody.position.z);
  vehicleMesh.quaternion.set(vehicleChassisBody.quaternion.x, vehicleChassisBody.quaternion.y, vehicleChassisBody.quaternion.z, vehicleChassisBody.quaternion.w);
  window.requestAnimationFrame(animate);
}
animate();
