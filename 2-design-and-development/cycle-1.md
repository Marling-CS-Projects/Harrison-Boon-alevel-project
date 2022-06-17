# 2.2.1 Cycle 1 - Getting Started

## Overview

In this first cycle I aim to create a TypeScript project using Snowpack that can be used to render objects on the screen using ThreeJS. I will also add lighting to the scene to test out features that I will need later in the project.

While most of the code written in this cycle may not end up staying in the final project, it will help to get me familiar with using the libraries and packages that I will need to use throughout the project. I am already proficient in TypeScript however I do not have experience with 3D rendering and physics libraries such as ThreeJS and cannon-es.&#x20;

### Objectives

* [x] Set up an environment in Visual Studio Code with support for TypeScript
* [x] Set up the Gtihub repository to store the code in.
* [x] Create a simple Snowpack project.
* [x] Add ThreeJS to the project and render a cube.
* [x] Add ThreeJS lighting so that the cube is visible and textured.
* [x] Make the cube spin.

### Usability Features

### Key Variables

| Variable Name                   | Use                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| cubeMesh                        | Stores properties of the cube and allows it to be manipulated.                            |
| speed                           | A constant that represents the speed at which I want the cube to rotate.                  |
| scene                           | The ThreeJS scene is where all of the objects to be rendered are stored.                  |
| camera                          | The ThreeJS camera provides a viewpoint in order for the user to be able to see the game. |
| renderer                        | The ThreeJS renderer is used to render 3D objects to the DOM element.                     |
| ambientLight & directionalLight | Both of these variables are used to generate lighting in the ThreeJS scene.               |

### Pseudocode

```
speed := 5
scene := createThreeJSScene()
camera := createThreeJSCamera(cameraSettings)
renderer := createThreeJSRenderer(rendererSettings)

cubeMesh := createBoxMesh(boxSettings)
ambientLight := createAmbientLight(ambientLightSettings)
directionalLight := createDirectionalLight(directionalLightSettings)
addMeshToScene(scene, cubeMesh)
addLightToScene(scene, ambientLight)
addLightToScene(scene, directionalLight)
setPosition(camera, 0,0,5)

function animate():
    requestAnimationFrame(animate)
    incrementXRotation(cubeMesh, speed)
    incrementYRotation(cubeMesh, speed)
    renderer.render(scene, camera)
end function

```

## Development

### Outcome

In `/src/index.ts` I create the necessary ThreeJS variables and also a function `animate` that will run every frame and update things such as the cube's movement while also updating the on-screen rendering according to where the objects and camera are in the ThreeJS scene. The ThreeJS renderer renders objects onto the HTML canvas in `/public/index.html`

{% tabs %}
{% tab title="/public/index.html" %}
```markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <canvas class="webgl"></canvas>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script type="module" src="/dist/index.js"></script>
  </body>
</html>
```
{% endtab %}

{% tab title="/src/index.ts" %}
```typescript
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
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );

// Create the cube using a ThreeJS mesh
const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshLambertMaterial({color: 0xff0044})
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
};

animate();
```
{% endtab %}
{% endtabs %}

### Challenges

One challenge of this cycle is that all of my TypeScript code will be inside of the same file. This can make readability more difficult and overall the code will be harder to follow for human readers. To help cope with this challenge in the future I will split my code up into multiple sections and distribute them across separate files.&#x20;

## Testing

### Tests

| Test | Instructions      | What I expect                               | What actually happens | Pass/Fail |
| ---- | ----------------- | ------------------------------------------- | --------------------- | --------- |
| 1    | Run code          | Snowpack server starts up                   | As expected           | Pass      |
| 2    | Go to the website | Spinning red cube will appear on the screen | As expected           | Pass      |

### Evidence

![](<../.gitbook/assets/image (6).png>)

![Cube in motion](<../.gitbook/assets/image (7).png>)
