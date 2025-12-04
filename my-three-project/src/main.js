import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls, model, mainLight;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202020);

  camera = new THREE.PerspectiveCamera(
    45,
    (window.innerWidth * 0.6) / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(2.5, 1.6, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  const container = document.getElementById("three-container");
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(5, 10, 7);
  scene.add(mainLight);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const draco = new DRACOLoader();
  draco.setDecoderPath("/draco/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  loader.load(
    "/mini_oficina_export_ready.glb",
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.2, 0.2, 0.2);
      scene.add(model);
    },
    undefined,
    (err) => console.error("Error GLB:", err)
  );

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

/* === BUTTONS HEADER === */
document.getElementById("btn-color").onclick = () => {
  if (!model) return;
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.color.setHSL(Math.random(), 0.5, 0.5);
    }
  });
};

document.getElementById("btn-light").onclick = () => {
  mainLight.intensity = mainLight.intensity === 2 ? 0.7 : 2;
};

document.getElementById("btn-theme-header").onclick = () => {
  document.body.classList.toggle("light");

  scene.background = new THREE.Color(
    document.body.classList.contains("light") ? 0xe0e0e0 : 0x202020
  );
};


/* RESET preserved by you */
document.getElementById("btn-color").onclick = () => {
  camera.position.set(2.5, 1.6, 3);
  if (model) model.rotation.set(0, 0, 0);
};

window.addEventListener("resize", () => {
  const w = window.innerWidth * 0.6;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

init();
