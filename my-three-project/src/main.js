import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.querySelector('#three-container');
const message = document.querySelector('#viewer-message');

try {
  mountStudio();
} catch {
  message.textContent = 'Vista 3D no disponible en este dispositivo';
}

function mountStudio() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#101e26');
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 30);
  camera.position.set(4.2, 3.2, 5.8);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.update();
  controls.saveState();

  const light = new THREE.DirectionalLight('#d8fff8', 2.4);
  light.position.set(3, 6, 5);
  scene.add(light, new THREE.HemisphereLight('#ddf6f2', '#324356', 2));

  function box(w, h, d, x, y, z, color) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color }),
    );
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }

  // A small workstation assembled from meshes so the viewer has no model download.
  box(3.75, .17, 2.75, 0, .12, 0, '#243d48');
  box(2.85, .14, 1.46, 0, 1.02, 0, '#af8660');
  for (const x of [-1.18, 1.18]) {
    for (const z of [-.52, .52]) box(.14, .88, .14, x, .57, z, '#55747b');
  }
  box(.55, .065, .32, -.38, 1.12, -.25, '#304b55');
  box(.14, .29, .12, -.38, 1.26, -.32, '#304b55');
  box(1.45, .88, .09, -.38, 1.7, -.33, '#314a52');
  box(1.34, .76, .03, -.38, 1.7, -.27, '#0c2431');
  box(.92, .37, .025, -.38, 1.65, -.247, '#148c80');
  box(.63, .035, .024, -.48, 1.94, -.246, '#b1eee3');
  box(.88, .055, .28, -.37, 1.12, .36, '#91aaa8');
  box(.14, .07, .2, .35, 1.12, .36, '#d5e9e4');
  box(.31, .17, .3, 1.04, 1.17, -.34, '#ad644b');
  const plant = new THREE.Mesh(
    new THREE.IcosahedronGeometry(.23, 0),
    new THREE.MeshStandardMaterial({ color: '#50ae79' }),
  );
  plant.position.set(1.04, 1.44, -.34);
  scene.add(plant);

  const render = () => renderer.render(scene, camera);
  const resize = () => {
    const { clientWidth, clientHeight } = container;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    render();
  };

  container.replaceChildren(renderer.domElement);
  renderer.domElement.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    message.textContent = 'Vista 3D temporalmente no disponible';
  });
  renderer.domElement.addEventListener('webglcontextrestored', () => {
    message.textContent = 'Estudio 3D · Arrastra para girar';
    resize();
  });
  controls.addEventListener('change', render);
  new ResizeObserver(resize).observe(container);
  resize();

  document.querySelector('#reset-view').addEventListener('click', () => controls.reset());
  document.querySelector('#toggle-light').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const dimmed = button.getAttribute('aria-pressed') === 'true';
    light.intensity = dimmed ? 2.4 : .45;
    button.setAttribute('aria-pressed', String(!dimmed));
    render();
  });
  document.querySelector('#viewer-actions').hidden = false;
  message.textContent = 'Estudio 3D · Arrastra para girar';
}
