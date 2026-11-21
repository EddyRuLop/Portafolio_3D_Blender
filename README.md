# Portafolio 3D con Three.js

Prototipo de portafolio personal que combina una página en HTML y CSS con un visor 3D en Three.js. El sitio se desarrolla con Vite.

## Ejecutar localmente

Requiere Node.js 20.19+ o 22.12+.

```bash
cd my-three-project
npm ci
npm run dev
```

Ejecuta `npm run build` para compilar. La salida está en `my-three-project/dist/`.

El visor busca `my-three-project/public/mini_oficina_export_ready.glb` para cargar la escena de Blender. Ese archivo no está incluido en el repositorio. Puedes abrir el sitio para revisar el contenido y la interfaz del prototipo.
