# Portafolio de Eduardo Ruiz

CV interactivo para el Modelo Dual con proyectos de software, experiencia y enlaces de contacto. Incluye una escena 3D con Three.js que se puede girar, centrar e iluminar desde el navegador. El contenido y la descarga del CV se pueden usar sin WebGL.

## Ejecutar localmente

Requiere Node.js 20.19+ o 22.12+.

```bash
cd my-three-project
npm ci
npm run dev
```

## Compilar y publicar

```bash
npm run build
npm run preview
```

La compilación genera `my-three-project/dist/`. En Cloudflare Pages, usa `my-three-project` como directorio raíz, `npm run build` como comando de compilación y `dist` como directorio de salida.

## Estructura

- `my-three-project/index.html` contiene el perfil, los proyectos y la experiencia.
- `my-three-project/src/main.js` controla la escena Three.js.
