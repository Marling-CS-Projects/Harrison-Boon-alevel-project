import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon-es";

const gravity = -9.8;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0f0019);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Initiate orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, gravity, 0),
});

const ambientLighting = new THREE.AmbientLight(0xaaaaaa);
const directionalLighting = new THREE.DirectionalLight(0xffffff);
directionalLighting.position.set(-5, 5, 5);
directionalLighting.castShadow = true;
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Create a simulated sphere
const sphereMaterial = new CANNON.Material();
const sphereBody = new CANNON.Body({
  mass: 1,
  material: sphereMaterial,
  position: new CANNON.Vec3(0, 5, -2),
});
sphereBody.addShape(new CANNON.Sphere(0.5));

// Create a rendered sphere
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  new THREE.MeshLambertMaterial({
    color: 0xff0044,
  })
);
sphereMesh.castShadow = true;

// Create the simulated ground
const groundMaterial = new CANNON.Material("ground");
const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
groundBody.addShape(new CANNON.Box(new CANNON.Vec3(2, 4, 0.1)));
groundBody.quaternion.setFromEuler(-Math.PI / 3, 0, 0);

// Create the rendered plane
const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(4, 8),
  new THREE.MeshLambertMaterial({ color: 0xffffff })
);
planeMesh.quaternion.set(
  groundBody.quaternion.x,
  groundBody.quaternion.y,
  groundBody.quaternion.z,
  groundBody.quaternion.w
);
planeMesh.position.set(
  groundBody.position.x,
  groundBody.position.y + 0.1,
  groundBody.position.z
);
planeMesh.receiveShadow = true;

// Describe how the sphere interacts with the plane
const contactMaterial = new CANNON.ContactMaterial(
  groundMaterial,
  sphereMaterial,
  { friction: 0.9, restitution: 0.5 }
);

// Add all simulated bodies to the simulated world
world.addBody(sphereBody);
world.addBody(groundBody);
world.addContactMaterial(contactMaterial);

// Add all rendered objects to the scene
scene.add(sphereMesh);
scene.add(ambientLighting);
scene.add(directionalLighting);
scene.add(planeMesh);

const clock = new THREE.Clock();

function animate() {
  renderer.render(scene, camera);

  world.step(clock.getDelta());

  // If the sphere is too far below the platform, teleport it above
  if (sphereBody.position.y < -50) {
    sphereBody.position = new CANNON.Vec3(0, 5, -2);
    sphereBody.velocity = new CANNON.Vec3(0, 0, 0);
    sphereBody.angularVelocity = new CANNON.Vec3(0, 0, 0);
  }

  // Update the rendered sphere to the simulated sphere's position every frame
  sphereMesh.position.set(
    sphereBody.position.x,
    sphereBody.position.y,
    sphereBody.position.z
  );
  sphereMesh.quaternion.set(
    sphereBody.quaternion.x,
    sphereBody.quaternion.y,
    sphereBody.quaternion.z,
    sphereBody.quaternion.w
  );
  window.requestAnimationFrame(animate);
}
animate();
