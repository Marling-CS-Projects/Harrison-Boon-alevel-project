import SimplexNoise from "simplex-noise";
import * as THREE from "three";
import * as CANNON from "cannon-es";

export function terrainGenerate(seed: string, groundMaterial: CANNON.Material) {
  const simplex = new SimplexNoise(Math.random());
  const segments = 51;
  const planeGeometry = new THREE.PlaneGeometry(
    500,
    500,
    segments - 1,
    segments - 1
  );
  const colours: number[] = [];

  // This sets the height of each vertex of the plane to a noise-generated value
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
    material: groundMaterial,
  });

  // This loops through the vertices of the rendered plane and sets the heights of the simulated plane to the heights of the rendered plane
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
    const dy =
      planeGeometry.attributes.position.array[(i + 1 + segments) * 3 + 1];
    const dz =
      planeGeometry.attributes.position.array[(i + 1 + segments) * 3 + 2];

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
  trimeshBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  );
  return { trimeshBody, planeGeometry, colours };
}
