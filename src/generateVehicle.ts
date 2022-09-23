import * as CANNON from "cannon-es";
import * as THREE from "three";

export function generateVehicle() {
  const vehicleChassisBody = new CANNON.Body({
    mass: 25,
    position: new CANNON.Vec3(0, 50, 0),
  });
  vehicleChassisBody.addShape(
    new CANNON.Box(new CANNON.Vec3(5, 0.5, 2)),
    new CANNON.Vec3(0, -300000, 0)
  );

  const vehicleMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
  const vehicleGeometry = new THREE.BoxGeometry(10, 1, 4);
  const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
  vehicleMesh.castShadow = true;
  vehicleMesh.receiveShadow = true;

  const vehicle = new CANNON.RigidVehicle({
    chassisBody: vehicleChassisBody,
  });

  const mass = 25;
  const axisWidth = 7;
  const wheelShape = new CANNON.Sphere(1.5);
  const wheelMaterial = new CANNON.Material("wheel");
  const down = new CANNON.Vec3(0, -1, 0);

  const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
  wheelBody1.addShape(wheelShape);
  vehicle.addWheel({
    body: wheelBody1,
    position: new CANNON.Vec3(-5, 0, axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
  });

  const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial });
  wheelBody2.addShape(wheelShape);
  vehicle.addWheel({
    body: wheelBody2,
    position: new CANNON.Vec3(-5, 0, -axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, -1),
    direction: down,
  });

  const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial });
  wheelBody3.addShape(wheelShape);
  vehicle.addWheel({
    body: wheelBody3,
    position: new CANNON.Vec3(5, 0, axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
  });

  const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial });
  wheelBody4.addShape(wheelShape);
  vehicle.addWheel({
    body: wheelBody4,
    position: new CANNON.Vec3(5, 0, -axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, -1),
    direction: down,
  });

  vehicle.wheelBodies.forEach((wheelBody) => {
    wheelBody.angularDamping = 0.4;
  });

  const wheelRenderMaterial = new THREE.MeshLambertMaterial({
    color: 0xff00cc,
  });
  const wheelRenderGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1);
  wheelRenderGeometry.rotateX(Math.PI / 2);
  const wheelMesh1 = new THREE.Mesh(wheelRenderGeometry, wheelRenderMaterial);
  const wheelMesh2 = new THREE.Mesh(wheelRenderGeometry, wheelRenderMaterial);
  const wheelMesh3 = new THREE.Mesh(wheelRenderGeometry, wheelRenderMaterial);
  const wheelMesh4 = new THREE.Mesh(wheelRenderGeometry, wheelRenderMaterial);
  wheelMesh1.castShadow = true;
  wheelMesh1.receiveShadow = true;
  wheelMesh2.castShadow = true;
  wheelMesh2.receiveShadow = true;
  wheelMesh3.castShadow = true;
  wheelMesh3.receiveShadow = true;
  wheelMesh4.castShadow = true;
  wheelMesh4.receiveShadow = true;

  return {
    vehicle,
    vehicleChassisBody,
    vehicleMesh,
    wheelBodies: [wheelBody1, wheelBody2, wheelBody3, wheelBody4],
    wheelMeshes: [wheelMesh1, wheelMesh2, wheelMesh3, wheelMesh4],
    wheelMaterial,
  };
}
