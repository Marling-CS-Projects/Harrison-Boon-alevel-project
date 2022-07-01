import "./style.css.proxy.js";
import * as THREE from "../snowpack/pkg/three.js";
import {OrbitControls} from "../snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "../snowpack/pkg/cannon-es.js";
import SimplexNoise from "../snowpack/pkg/simplex-noise.js";
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
directionalLighting.position.set(-5, 5, 5);
directionalLighting.castShadow = true;
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
const groundBody = new CANNON.Body({mass: 0, material: groundMaterial});
const simplex = new SimplexNoise(Math.random());
const segments = 51;
const planeGeometry = new THREE.PlaneGeometry(500, 500, segments - 1, segments - 1);
const colours = [];
for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
  const x = planeGeometry.attributes.position.array[i * 3];
  const y = planeGeometry.attributes.position.array[i * 3 + 1];
  const height = simplex.noise2D(x / 64, y / 64) * 20;
  planeGeometry.attributes.position.setZ(i, height);
  if (height > 18) {
    colours.push(1, 1, 1);
  } else if (height > 5) {
    colours.push(0.56, 0.54, 0.48);
  } else if (height < -15) {
    colours.push(0.501, 0.772, 0.87);
  } else {
    colours.push(0.56, 0.68, 0.166);
  }
}
const trimeshBody = new CANNON.Body({
  mass: 0,
  material: groundMaterial
});
for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
  if (i % segments == segments - 1) {
    continue;
  }
  const x = planeGeometry.attributes.position.array[i * 3];
  const y = planeGeometry.attributes.position.array[i * 3 + 1];
  const z = planeGeometry.attributes.position.array[i * 3 + 2];
  const tx = planeGeometry.attributes.position.array[(i + 1) * 3];
  const ty = planeGeometry.attributes.position.array[(i + 1) * 3 + 1];
  const tz = planeGeometry.attributes.position.array[(i + 1) * 3 + 2];
  const dx = planeGeometry.attributes.position.array[(i + 1 + segments) * 3];
  const dy = planeGeometry.attributes.position.array[(i + 1 + segments) * 3 + 1];
  const dz = planeGeometry.attributes.position.array[(i + 1 + segments) * 3 + 2];
  const ex = planeGeometry.attributes.position.array[(i + segments) * 3];
  const ey = planeGeometry.attributes.position.array[(i + segments) * 3 + 1];
  const ez = planeGeometry.attributes.position.array[(i + segments) * 3 + 2];
  const vertices1 = [x, y, z, tx, ty, tz, ex, ey, ez];
  const indices = [0, 1, 2];
  const trimesh1 = new CANNON.Trimesh(vertices1, indices);
  trimeshBody.addShape(trimesh1);
  const vertices2 = [tx, ty, tz, ex, ey, ez, dx, dy, dz];
  const trimesh2 = new CANNON.Trimesh(vertices2, indices);
  trimeshBody.addShape(trimesh2);
}
trimeshBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
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
    sphereBody.position = new CANNON.Vec3(0, 20, 0);
    sphereBody.velocity = new CANNON.Vec3(0, 0, 0);
    sphereBody.angularVelocity = new CANNON.Vec3(0, 0, 0);
  }
  sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
  sphereMesh.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w);
  window.requestAnimationFrame(animate);
}
animate();
