/* HERO 3D ANIMATION */
(function () {
  const canvas = document.getElementById('hc');
  if (!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
  cam.position.z = 7;

  // Torus Knot
  const tk = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2.4, .55, 130, 18),
    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true, opacity: .07 })
  );
  scene.add(tk);

  // Core Icosahedron
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 2),
    new THREE.MeshBasicMaterial({ color: 0x4b5563, wireframe: true, transparent: true, opacity: .04 })
  );
  scene.add(core);

  // Particle System
  const pa = new Float32Array(300 * 3);
  for (let i = 0; i < pa.length; i++) pa[i] = (Math.random() - .5) * 22;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x000000, size: .02, transparent: true, opacity: .25 })));

  let dmx = 0, dmy = 0;
  window.addEventListener('mousemove', e => { dmx = (e.clientX / innerWidth - .5) * .55; dmy = (e.clientY / innerHeight - .5) * .55; });
  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  (function loop() {
    requestAnimationFrame(loop);
    tk.rotation.x += .0012; tk.rotation.y += .0016;
    core.rotation.y += .0024; core.rotation.x += .0006;
    cam.position.x += (dmx - cam.position.x) * .04;
    cam.position.y += (-dmy - cam.position.y) * .04;
    renderer.render(scene, cam);
  })();
})();
