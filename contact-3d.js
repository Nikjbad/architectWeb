/* CONTACT PAGE 3D ANIMATION */
(function () {
  const canvas = document.getElementById('hc');
  if (!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight * 0.5);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth / (innerHeight * 0.5), 0.1, 100);
  cam.position.z = 5.5;

  // Box Geometry
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true, opacity: .08 })
  );
  scene.add(box);

  // Pyramid (using ConeGeometry)
  const pyramid = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 2.5, 4),
    new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: true, transparent: true, opacity: .06 })
  );
  pyramid.position.x = -2;
  scene.add(pyramid);

  // Cylinder
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 2, 8),
    new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: .05 })
  );
  cylinder.position.x = 2;
  scene.add(cylinder);

  // Particle Cloud
  const pa = new Float32Array(200 * 3);
  for (let i = 0; i < pa.length; i++) pa[i] = (Math.random() - .5) * 16;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x000000, size: .02, transparent: true, opacity: .25 })));

  let dmx = 0, dmy = 0;
  window.addEventListener('mousemove', e => { dmx = (e.clientX / innerWidth - .5) * .4; dmy = (e.clientY / innerHeight - .5) * .4; });
  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / (innerHeight * 0.5);
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight * 0.5);
  });

  (function loop() {
    requestAnimationFrame(loop);
    box.rotation.x += .0010;
    box.rotation.y += .0013;
    pyramid.rotation.x -= .0008;
    pyramid.rotation.z += .0012;
    cylinder.rotation.x += .0009;
    cylinder.rotation.y += .0006;
    cam.position.x += (dmx - cam.position.x) * .05;
    cam.position.y += (-dmy - cam.position.y) * .05;
    renderer.render(scene, cam);
  })();
})();
