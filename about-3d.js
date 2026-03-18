/* ABOUT PAGE 3D ANIMATION */
(function () {
  const canvas = document.getElementById('hc');
  if (!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight * 0.5);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth / (innerHeight * 0.5), 0.1, 100);
  cam.position.z = 5;

  // Octahedron
  const oct = new THREE.Mesh(
    new THREE.OctahedronGeometry(2),
    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true, opacity: .08 })
  );
  scene.add(oct);

  // Dodecahedron
  const dod = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1.5),
    new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: .05 })
  );
  scene.add(dod);

  // Particles
  const pa = new Float32Array(200 * 3);
  for (let i = 0; i < pa.length; i++) pa[i] = (Math.random() - .5) * 15;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x000000, size: .015, transparent: true, opacity: .2 })));

  let dmx = 0, dmy = 0;
  window.addEventListener('mousemove', e => { dmx = (e.clientX / innerWidth - .5) * .4; dmy = (e.clientY / innerHeight - .5) * .4; });
  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / (innerHeight * 0.5);
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight * 0.5);
  });

  (function loop() {
    requestAnimationFrame(loop);
    oct.rotation.x += .0008; oct.rotation.y += .0012;
    dod.rotation.y -= .0010; dod.rotation.z += .0006;
    cam.position.x += (dmx - cam.position.x) * .05;
    cam.position.y += (-dmy - cam.position.y) * .05;
    renderer.render(scene, cam);
  })();
})();
