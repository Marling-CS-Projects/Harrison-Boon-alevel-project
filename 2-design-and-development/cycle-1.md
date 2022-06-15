# 2.2.1 Cycle 1 - Getting Started

## Overview

In this first cycle I aim to create a TypeScript project using Snowpack that can be used to render objects on the screen using ThreeJS. I will render multiple objects on the screen to confirm that ThreeJS can handle this (it will be necessary for my game).

While most of the code written in this cycle may not end up staying in the final project, it will help to get me familiar with using the libraries and packages that I will need to use throughout the project. I am already proficient in TypeScript however I do not have experience with 3D rendering and physics libraries such as ThreeJS and cannon-es.&#x20;

### Objectives

* [x] Set up an environment in Visual Studio Code with support for TypeScript
* [x] Set up the Gtihub repository to store the code in.
* [x] Create a simple Snowpack project.
* [x] Add ThreeJS to the project and render a cube.
* [x] Make the cube spin.

### Usability Features

### Key Variables

| Variable Name | Use                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------- |
| cubeMesh      | Stores properties of the cube and allows it to be manipulated.                            |
| speed         | A constant that represents the speed at which I want the cube to rotate.                  |
| scene         | The ThreeJS scene is where all of the objects to be rendered are stored.                  |
| camera        | The ThreeJS camera provides a viewpoint in order for the user to be able to see the game. |
| renderer      | The ThreeJS renderer is used to render 3D objects to the DOM element.                     |

### Pseudocode

```
speed := 5
scene := createThreeJSScene()
camera := createThreeJSCamera(cameraSettings)
renderer := createThreeJSRenderer(rendererSettings)

cubeMesh := createBoxMesh(boxSettings)
addMeshToScene(scene, cubeMesh)
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

### Challenges

Description of challenges

## Testing

Evidence for testing

### Tests

| Test | Instructions  | What I expect     | What actually happens | Pass/Fail |
| ---- | ------------- | ----------------- | --------------------- | --------- |
| 1    | Run code      | Thing happens     | As expected           | Pass      |
| 2    | Press buttons | Something happens | As expected           | Pass      |

### Evidence
