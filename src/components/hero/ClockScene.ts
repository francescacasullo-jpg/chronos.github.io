import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * L'Orologio del Tempo — scena Three.js autentica.
 * Un orologio armillare contemporaneo sospeso in uno spazio architettonico scuro:
 * anelli concentrici, incisioni geometriche, lancette che seguono l'ora reale,
 * luce dinamica e polvere dorata. Reagisce delicatamente al puntatore.
 */
export interface ClockSceneOptions {
  reducedMotion: boolean;
  lowPower: boolean;
}

export function createClockScene(container: HTMLElement, opts: ClockSceneOptions) {
  const renderer = new THREE.WebGLRenderer({ antialias: !opts.lowPower, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.lowPower ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x090909, 0.055);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  /* ── Materiali ── */
  const gold = new THREE.MeshStandardMaterial({ color: 0xb69a63, metalness: 1, roughness: 0.28, envMapIntensity: 0.9 });
  const bronze = new THREE.MeshStandardMaterial({ color: 0x785b3a, metalness: 1, roughness: 0.42, envMapIntensity: 0.7 });
  const ivory = new THREE.MeshStandardMaterial({ color: 0xf2ede3, metalness: 0.6, roughness: 0.25, envMapIntensity: 0.8 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x1a1816, metalness: 0.1, roughness: 0.92 });
  const dial = new THREE.MeshStandardMaterial({ color: 0x0f0e0c, metalness: 0.7, roughness: 0.55, side: THREE.DoubleSide });
  const engrave = new THREE.LineBasicMaterial({ color: 0xb69a63, transparent: true, opacity: 0.55 });

  const disposables: { dispose(): void }[] = [gold, bronze, ivory, stone, dial, engrave, envTex, pmrem];
  const track = <T extends { dispose(): void }>(g: T) => (disposables.push(g), g);

  /* ── Spazio architettonico: colonnato e arco ── */
  const architecture = new THREE.Group();
  const colGeo = track(new THREE.BoxGeometry(0.9, 16, 0.9));
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue;
    const col = new THREE.Mesh(colGeo, stone);
    col.position.set(i * 3.4, 0, -9 - Math.abs(i) * 0.6);
    architecture.add(col);
  }
  const archGeo = track(new THREE.TorusGeometry(6.5, 0.18, 8, 96, Math.PI));
  const arch = new THREE.Mesh(archGeo, bronze);
  arch.position.set(0, 1.5, -10);
  architecture.add(arch);
  const floorGeo = track(new THREE.CircleGeometry(30, 64));
  const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ color: 0x0b0a09, metalness: 0.6, roughness: 0.4 }));
  disposables.push(floor.material as THREE.Material);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -5.2;
  architecture.add(floor);
  scene.add(architecture);

  /* ── L'orologio ── */
  const clock = new THREE.Group();
  scene.add(clock);

  // Quadrante: anello piatto scuro
  const dialMesh = new THREE.Mesh(track(new THREE.RingGeometry(0.4, 2.9, 96, 1)), dial);
  dialMesh.position.z = -0.06;
  clock.add(dialMesh);

  // Anelli principali
  const ring = (r: number, t: number, m: THREE.Material) => new THREE.Mesh(track(new THREE.TorusGeometry(r, t, 24, 180)), m);
  clock.add(ring(3.0, 0.07, gold));
  clock.add(ring(2.72, 0.022, bronze));
  clock.add(ring(1.55, 0.03, gold));
  clock.add(ring(0.45, 0.05, gold));

  // Tacche dei minuti (InstancedMesh)
  const tickGeo = track(new THREE.BoxGeometry(0.03, 0.16, 0.04));
  const ticks = new THREE.InstancedMesh(tickGeo, ivory, 60);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const major = i % 5 === 0;
    const s = new THREE.Vector3(major ? 1.8 : 1, major ? 2.1 : 1, 1);
    const p = new THREE.Vector3(Math.sin(a) * 2.5, Math.cos(a) * 2.5, 0);
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -a);
    m4.compose(p, q, s);
    ticks.setMatrixAt(i, m4);
  }
  clock.add(ticks);

  // Incisioni geometriche: stella a 12 punte e poligoni
  const engraving = new THREE.Group();
  const star: number[] = [];
  for (let i = 0; i < 12; i++) {
    const a1 = (i / 12) * Math.PI * 2;
    const a2 = ((i + 5) / 12) * Math.PI * 2;
    star.push(Math.sin(a1) * 2.2, Math.cos(a1) * 2.2, 0, Math.sin(a2) * 2.2, Math.cos(a2) * 2.2, 0);
  }
  const starGeo = track(new THREE.BufferGeometry());
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(star, 3));
  engraving.add(new THREE.LineSegments(starGeo, engrave));
  const hexGeo = track(new THREE.EdgesGeometry(new THREE.CircleGeometry(1.2, 6)));
  const hex = new THREE.LineSegments(hexGeo, engrave);
  engraving.add(hex);
  engraving.position.z = -0.03;
  clock.add(engraving);

  // Lancette (seguono l'ora locale reale)
  const hand = (len: number, w: number, m: THREE.Material, z: number) => {
    const g = new THREE.Group();
    const geo = track(new THREE.BoxGeometry(w, len, 0.03));
    geo.translate(0, len / 2 - 0.15, 0);
    g.add(new THREE.Mesh(geo, m));
    g.position.z = z;
    return g;
  };
  const hourHand = hand(1.35, 0.09, gold, 0.06);
  const minuteHand = hand(2.15, 0.055, ivory, 0.1);
  const secondHand = hand(2.4, 0.018, bronze, 0.14);
  clock.add(hourHand, minuteHand, secondHand);
  const hub = new THREE.Mesh(track(new THREE.SphereGeometry(0.13, 24, 24)), gold);
  hub.position.z = 0.16;
  clock.add(hub);

  // Anelli armillari esterni che ruotano lentamente
  const armillary = new THREE.Group();
  const a1 = ring(3.6, 0.03, bronze);
  const a2 = ring(4.05, 0.02, gold);
  const a3 = ring(4.45, 0.014, bronze);
  a1.rotation.x = Math.PI / 2.4;
  a2.rotation.y = Math.PI / 2.8;
  a3.rotation.x = Math.PI / 3.2;
  a3.rotation.y = Math.PI / 5;
  armillary.add(a1, a2, a3);
  // piccole sfere-pianeta sugli anelli
  const bead = track(new THREE.SphereGeometry(0.07, 16, 16));
  [a1, a2, a3].forEach((r, i) => {
    const b = new THREE.Mesh(bead, i === 1 ? ivory : gold);
    const rad = (r.geometry as THREE.TorusGeometry).parameters.radius;
    b.position.set(rad, 0, 0);
    r.add(b);
  });
  clock.add(armillary);

  /* ── Particelle sottili ── */
  const count = opts.lowPower ? 380 : 900;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 26;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
  }
  const pGeo = track(new THREE.BufferGeometry());
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = track(
    new THREE.PointsMaterial({ color: 0xd9c08a, size: 0.035, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  const dust = new THREE.Points(pGeo, pMat);
  scene.add(dust);

  /* ── Luci ── */
  scene.add(new THREE.AmbientLight(0xf2ede3, 0.12));
  const key = new THREE.DirectionalLight(0xffe2b0, 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rim = new THREE.PointLight(0xb69a63, 30, 30, 2);
  rim.position.set(-5, 2, -3);
  scene.add(rim);
  const orbit = new THREE.PointLight(0xfff1d6, 18, 14, 2);
  scene.add(orbit);
  const oculus = new THREE.SpotLight(0xf2ede3, 40, 40, Math.PI / 9, 0.6, 1.5);
  oculus.position.set(0, 14, -6);
  oculus.target.position.set(0, -5, -6);
  scene.add(oculus, oculus.target);

  /* ── Interazione ── */
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  // Composizione asimmetrica: l'orologio si sposta a destra su schermi larghi, in alto su quelli stretti
  const base = { x: 0, y: 0 };
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Su schermi stretti allontaniamo la camera per far entrare l'orologio
    const ar = w / h;
    camera.position.z = ar < 0.8 ? 17 : ar < 1.2 ? 14 : 13.5;
    base.x = ar > 1.25 ? Math.min(2.9, (ar - 1) * 3) : 0;
    base.y = ar < 0.8 ? 2.6 : ar < 1.25 ? 1.2 : 0;
    clock.position.x = base.x;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ── Loop ── */
  let raf = 0;
  let running = false;
  const clockTimer = new THREE.Timer();
  let t = 0;

  const setHands = () => {
    const now = new Date();
    const ms = now.getMilliseconds();
    const s = now.getSeconds() + (opts.reducedMotion ? 0 : ms / 1000);
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;
    secondHand.rotation.z = -(s / 60) * Math.PI * 2;
    minuteHand.rotation.z = -(m / 60) * Math.PI * 2;
    hourHand.rotation.z = -(h / 12) * Math.PI * 2;
  };

  const frame = (ts?: number) => {
    clockTimer.update(ts);
    const dt = Math.min(clockTimer.getDelta(), 0.05);
    const speed = opts.reducedMotion ? 0 : 1;
    t += dt * speed;

    setHands();
    a1.rotation.z += dt * 0.12 * speed;
    a2.rotation.z -= dt * 0.08 * speed;
    a3.rotation.z += dt * 0.05 * speed;
    engraving.rotation.z -= dt * 0.03 * speed;
    hex.rotation.z += dt * 0.06 * speed;

    // Sospensione: lieve oscillazione verticale
    clock.position.y = base.y + Math.sin(t * 0.6) * 0.08;

    // Reazione al puntatore (smorzata)
    const tx = opts.reducedMotion ? 0 : pointer.y * 0.22;
    const ty = opts.reducedMotion ? 0 : pointer.x * 0.32;
    clock.rotation.x += (tx - clock.rotation.x) * 0.04;
    clock.rotation.y += (ty - clock.rotation.y) * 0.04;
    architecture.position.x += (-pointer.x * 0.4 - architecture.position.x) * 0.03;

    // Luce dinamica che orbita
    orbit.position.set(Math.cos(t * 0.4) * 6, Math.sin(t * 0.3) * 3, 4 + Math.sin(t * 0.4) * 2);

    dust.rotation.y = t * 0.012;
    dust.position.y = Math.sin(t * 0.2) * 0.3;

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running) return;
    running = true;
    clockTimer.reset();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  // In pausa quando fuori schermo o con scheda nascosta (prestazioni)
  const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0.01 });
  io.observe(container);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  frame();

  return {
    dispose() {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
