import "./style.css";
import * as THREE from "three";
const speed = 0.05;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create lighting for the scene
const ambientLighting = new THREE.AmbientLight(0xaaaaaa);
const directionalLighting = new THREE.DirectionalLight(0xdddddd);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube using a ThreeJS mesh
const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshLambertMaterial({ color: 0xff0044 })
);

scene.add(cubeMesh);
scene.add(ambientLighting);
scene.add(directionalLighting);

// Move camera back to see the cube
camera.position.z += 5;

function animate() {
  renderer.render(scene, camera);

  // Rotate the cube
  cubeMesh.rotation.x += speed;
  cubeMesh.rotation.y += speed;

  window.requestAnimationFrame(animate);
}
animate();
