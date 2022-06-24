import "./style.css.proxy.js";
import * as THREE from "../snowpack/pkg/three.js";
import {OrbitControls} from "../snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "../snowpack/pkg/cannon-es.js";
const gravity = -9.8;
const renderSpheres = [];
const simSpheres = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
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
const sphereBody1 = new CANNON.Body({
  mass: 1,
  material: sphereMaterial,
  position: new CANNON.Vec3(0, 5, -2)
});
sphereBody1.addShape(new CANNON.Sphere(0.5));
simSpheres.push(sphereBody1);
const sphereMesh1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), new THREE.MeshLambertMaterial({
  color: 16711748
}));
sphereMesh1.castShadow = true;
renderSpheres.push(sphereMesh1);
const groundMaterial = new CANNON.Material("ground");
const groundBody = new CANNON.Body({mass: 0, material: groundMaterial});
groundBody.addShape(new CANNON.Box(new CANNON.Vec3(2, 4, 0.1)));
groundBody.quaternion.setFromEuler(-Math.PI / 3, 0, 0);
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 8), new THREE.MeshLambertMaterial({color: 16777215}));
planeMesh.quaternion.set(groundBody.quaternion.x, groundBody.quaternion.y, groundBody.quaternion.z, groundBody.quaternion.w);
planeMesh.position.set(groundBody.position.x, groundBody.position.y + 0.1, groundBody.position.z);
planeMesh.receiveShadow = true;
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {friction: 0.9, restitution: 0.5});
for (const spherBody of simSpheres) {
  console.log(spherBody);
  world.addBody(spherBody);
}
world.addBody(groundBody);
world.addContactMaterial(contactMaterial);
for (const spherMesh of renderSpheres) {
  console.log(spherMesh);
  scene.add(spherMesh);
}
scene.add(ambientLighting);
scene.add(directionalLighting);
scene.add(planeMesh);
const clock = new THREE.Clock();
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    const phys = new CANNON.Body({
      mass: 1,
      material: sphereMaterial,
      position: new CANNON.Vec3(0, 5, -2),
      shape: new CANNON.Sphere(0.5)
    });
    world.addBody(phys);
    simSpheres.push(phys);
    const rend = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), new THREE.MeshLambertMaterial({color: 16711748}));
    rend.position.set(0, 5, -2);
    scene.add(rend);
    renderSpheres.push(rend);
  }
});
function animate() {
  renderer.render(scene, camera);
  world.step(clock.getDelta());
  for (let i = 0; i < simSpheres.length; i++) {
    const sphereMesh = renderSpheres[i];
    const sphereBody = simSpheres[i];
    console.log(sphereBody.position);
    console.log(sphereMesh.position);
    if (simSpheres[i].position.y < -50) {
      scene.remove(renderSpheres[i]);
      world.removeBody(simSpheres[i]);
      continue;
    }
    sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
    sphereMesh.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w);
  }
  window.requestAnimationFrame(animate);
}
animate();
