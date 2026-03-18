/* SERVICES PAGE 3D ANIMATION */
(function () {
  const canvas = document.getElementById('hc');
  if (!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight * 0.5);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth / (innerHeight * 0.5), 0.1, 100);
  cam.position.z = 6;

  // Multiple Tetrahedrons rotating
  const geos = [];
  const colors = [0x000000, 0x1a1a1a, 0x333333];
  
  colors.forEach((color, i) => {
    const geo = new THREE.Mesh(
      new THREE.TetrahedronGeometry(2 - i * 0.4),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: .06 + i * .02 })
    );
    geo.position.z = i * 0.3;
    scene.add(geo);
    geos.push(geo);
  });

  // Animated particles in grid
  const pa = new Float32Array(150 * 3);
  for (let i = 0; i < pa.length; i++) pa[i] = (Math.random() - .5) * 18;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x000000, size: .018, transparent: true, opacity: .22 })));

  let dmx = 0, dmy = 0;
  window.addEventListener('mousemove', e => { dmx = (e.clientX / innerWidth - .5) * .35; dmy = (e.clientY / innerHeight - .5) * .35; });
  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / (innerHeight * 0.5);
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight * 0.5);
  });

  (function loop() {
    requestAnimationFrame(loop);
    geos.forEach((geo, i) => {
      geo.rotation.x += .0010 * (i + 1);
      geo.rotation.y += .0014 * (i + 1);
      geo.rotation.z += .0005 * (i + 1);
    });
    cam.position.x += (dmx - cam.position.x) * .04;
    cam.position.y += (-dmy - cam.position.y) * .04;
    renderer.render(scene, cam);
  })();
})();
