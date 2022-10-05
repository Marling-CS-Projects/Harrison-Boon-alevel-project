import SimplexNoise from "simplex-noise";
import * as THREE from "three";
import * as CANNON from "cannon-es";
export function terrainGenerate(seed: string) {
  const simplex = new SimplexNoise(seed);
  const segments = 51;
  const planeGeometry = new THREE.PlaneGeometry(
    500,
    500,
    segments - 1,
    segments - 1
  );
  const scale = 150;
  const groundMaterial = new CANNON.Material("groundMaterial");

  const trimeshBody = new CANNON.Body({ mass: 0, material: groundMaterial });
  for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
    const x = planeGeometry.attributes.position.array[i * 3];
    const y = planeGeometry.attributes.position.array[i * 3 + 1];

    const z = simplex.noise2D(x / scale, y / scale) * 10;
    planeGeometry.attributes.position.setZ(i, z);

    if (i % segments == segments - 1) {
      continue;
    }
    const nextX1 = planeGeometry.attributes.position.array[(i + 1) * 3];
    const nextY1 = planeGeometry.attributes.position.array[(i + 1) * 3 + 1];
    const nextZ1 = simplex.noise2D(nextX1 / scale, nextY1 / scale) * 10;

    const nextX2 = planeGeometry.attributes.position.array[(i + segments) * 3];
    const nextY2 =
      planeGeometry.attributes.position.array[(i + segments) * 3 + 1];
    const nextZ2 = simplex.noise2D(nextX2 / scale, nextY2 / scale) * 10;

    const nextX3 =
      planeGeometry.attributes.position.array[(i + 1 + segments) * 3];
    const nextY3 =
      planeGeometry.attributes.position.array[(i + 1 + segments) * 3 + 1];
    const nextZ3 = simplex.noise2D(nextX3 / scale, nextY3 / scale) * 10;

    const vertices1 = [x, y, z, nextX1, nextY1, nextZ1, nextX2, nextY2, nextZ2];
    const indices = [0, 1, 2];
    const trimesh1 = new CANNON.Trimesh(vertices1, indices);
    trimeshBody.addShape(trimesh1);

    const vertices2 = [
      nextX1,
      nextY1,
      nextZ1,
      nextX2,
      nextY2,
      nextZ2,
      nextX3,
      nextY3,
      nextZ3,
    ];
    const trimesh2 = new CANNON.Trimesh(vertices2, indices);
    trimeshBody.addShape(trimesh2);
  }
  trimeshBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  );
  return { trimeshBody, planeGeometry, groundMaterial };
}
