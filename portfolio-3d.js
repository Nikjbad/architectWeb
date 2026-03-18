/* PORTFOLIO PAGE 3D ANIMATION */
(function () {
  const canvas = document.getElementById('hc');
  if (!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight * 0.5);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth / (innerHeight * 0.5), 0.1, 100);
  cam.position.z = 6;

  // Central Sphere
  const sphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 4),
    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true, opacity: .08 })
  );
  scene.add(sphere);

  // Rotating Toruses
  const torus1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.3, 16, 32),
    new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: true, transparent: true, opacity: .05 })
  );
  torus1.rotation.x = Math.PI * 0.3;
  scene.add(torus1);

  const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.3, 16, 32),
    new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: .04 })
  );
  torus2.rotation.y = Math.PI * 0.5;
  scene.add(torus2);

  // Particle Ring
  const pa = new Float32Array(250 * 3);
  for (let i = 0; i < pa.length; i++) pa[i] = (Math.random() - .5) * 20;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x000000, size: .02, transparent: true, opacity: .2 })));

  let dmx = 0, dmy = 0;
  window.addEventListener('mousemove', e => { dmx = (e.clientX / innerWidth - .5) * .45; dmy = (e.clientY / innerHeight - .5) * .45; });
  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / (innerHeight * 0.5);
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight * 0.5);
  });

  (function loop() {
    requestAnimationFrame(loop);
    sphere.rotation.x += .0008;
    sphere.rotation.y += .0012;
    torus1.rotation.x += .0006;
    torus1.rotation.z += .0010;
    torus2.rotation.y += .0009;
    torus2.rotation.z -= .0007;
    cam.position.x += (dmx - cam.position.x) * .04;
    cam.position.y += (-dmy - cam.position.y) * .04;
    renderer.render(scene, cam);
  })();
})();
