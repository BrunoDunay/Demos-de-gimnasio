# Demos: sitios demo por giro (portafolio)

Leer primero `CONTEXTO.md` (quién es Bruno, paquetes y reglas). Este archivo resume cómo está armado el código y qué ya se hizo.

## Estructura

- `frontend/`: **un solo workspace de Angular 22** con una app por demo (comparten `node_modules`, importante porque la carpeta vive en OneDrive).
  - `projects/gym-brio` (Básico), `projects/gym-forja` (Profesional), `projects/gym-umbral` (Premium).
  - Cada app es independiente (sus propios componentes, íconos y estilos) para poder usarla como plantilla sin arrastrar a las demás.
  - `scripts/media-gym.mjs`: baja las fotos de Pexels, toma las de `referencias/gym/`, genera WebP (normal y `-sm`) y MP4 ligeros en `public/media/` de cada app. Se corre con `npm run media:gym`.
- `docs/gym/`: una ficha por demo (concepto, paleta, tipografías, secciones, animaciones, fotos).
- `.claude/skills/` + `skills-lock.json`: las skills del contexto (las de Duque más `design-dna`, `seo-audit`, `humanizer`, `frontend-design` y `web-design-guidelines`).

## Stack y convenciones

- Angular 22, componentes standalone con signals, zoneless, CSS propio (sin Tailwind), fuentes con `@fontsource`.
- **Salida estática** (`outputMode: "static"`): todas las rutas se prerenderizan, buen SEO y despliegue simple en Vercel.
- Animación: GSAP 3.15 (ScrollTrigger, SplitText) y Lenis para el scroll suave en Pro y Premium. El Básico usa CSS + IntersectionObserver.
- Recorrido del club (Umbral, /club): Three.js 0.180 con un shader sobre fotos planas (sin modelado 3D), cargado con `import()`. Fotos de referencia con letreros de otras marcas cambiados (`frontend/scripts/club3d/letrero.mjs`), ampliadas x2 con Swin2SR y con profundidad de Depth Anything V2 (transformers.js en CPU), y exportadas con `scripts/club3d/vistas.mjs`. Las zonas, vistas y objetos con hover están en `src/app/club3d/rooms.ts`. La fachada de "Un día" se genera con `scripts/club3d/fachada.mjs`. Se probó Gaussian Splatting con InfiniSplat y se descartó: se veía pixelado y con aspecto animado.
- Figuras de ejercicios (Forja): `figure-rig.ts` es copia del de Fitness by Evidence. Al mezclar posturas, cada brazo o pierna debe usar la misma forma (ángulos u objeto `{to}`) en todas, o salta en vez de interpolar.
- GSAP guarda `y` y `yPercent` por separado: usar uno para la entrada y otro para el parallax evita choques.
- Revelado al hacer scroll: atributo `data-reveal` (directiva en `shared/reveal.ts`). Anima con `@keyframes` sobre `translate`/`scale`, no sobre `transform`, para no chocar con los hovers. No poner `data-reveal` en elementos que ya tienen su propia `animation`.
- Con GSAP: no centrar con `transform` en CSS un elemento que GSAP va a mover (usar `translate` o envolverlo). Dentro de `<mask>` de SVG, escalar con el atributo `transform`.
- Ícono de pestaña (Forja y Umbral): `favicon.svg` transparente que cambia de color con `prefers-color-scheme` (oscuro en pestañas claras, claro en oscuras) y `favicon.ico` de respaldo con colores medios. Al cambiarlos, subir el `?v=` en `index.html` para que el navegador no use el viejo.
- Íconos: `shared/icon.ts` dibuja con plantillas (no `innerHTML`, porque el prerender no lo soporta en SVG).
- **Movimiento siempre activo:** el Windows de Bruno tiene apagados los efectos de animación y Chrome lo reporta como `prefers-reduced-motion`. Como el objetivo de las demos es mostrar movimiento, se ignora la preferencia del sistema y cada sitio trae un interruptor "Reducir movimiento" en el pie (guarda `reduce-motion` en localStorage y agrega la clase `.reduce-motion` a `<html>`).
- Formularios de contacto: arman el mensaje y muestran una vista previa tipo WhatsApp; el enlace es `wa.me/?text=` sin número (es demo). Datos de contacto ficticios pero creíbles (se muestran como texto, sin enlaces `tel:` para no marcar a números reales): Brío (449) 975 31 08, Forja (449) 268 47 15, Umbral (449) 413 86 20 · reservas@umbralclub.com.mx.
- Pie de cada demo: "Sitio demo con marca ficticia · Diseño y desarrollo: Bruno Dunay" con enlace al portafolio.
- Textos, commits y documentación en español.

## Comandos (desde `frontend/`)

```bash
npm run start:brio     # ng serve gym-brio  (puerto 4301)
npm run start:forja    # puerto 4302
npm run start:umbral   # puerto 4303
npm run build:gym      # compila las tres
npm run media:gym      # regenera fotos y videos
```

## Despliegue (Vercel, equipo "brunodunay's projects")

Se publica la carpeta compilada con la CLI de Vercel (la sesión ya está guardada en la máquina):

```bash
VERCEL_ORG_ID=team_GCtgq9lFKHWF1Y5sPouZyq9H VERCEL_PROJECT_ID=<id> npx vercel@latest deploy dist/<app>/browser --prod --yes
```

| Demo | Proyecto | ID | URL |
|---|---|---|---|
| Brío (Básico) | demo-gym-brio | prj_AecSoUJrzmjVGUG10frfIlcQph7X | https://demo-gym-brio.vercel.app |
| Forja (Pro) | demo-gym-forja | prj_Uq3IEQXy40788xKarVYJNzhgKeNa | https://demo-gym-forja-box.vercel.app |
| Umbral (Premium) | demo-gym-umbral | prj_rEVNKXMFiuOfZceHRXIk1jfXvWGh | https://demo-gym-umbral.vercel.app |

- `public/vercel.json` de cada app: cabeceras de seguridad, caché larga para `media/` y respaldo a `index.csr.html`.
- La protección de Vercel quedó solo para vistas previas; las URLs de producción son públicas.
- `demo-gym-forja.vercel.app` pertenece a otra cuenta (la demo de otro desarrollador, "FORJA Training Club"), por eso Forja usa `demo-gym-forja-box`.
- No se usó Neon: estas demos son solo frontend.

## Revisión visual

Para revisar sin abrir el navegador se usan scripts de puppeteer con el Chrome instalado (capturas por sección, a mitad de scroll o con el cursor encima). Los videos se revisan con hojas de cuadros hechas con ffmpeg. En capturas sin pantalla, el modo de GPU emulada puede dibujar mal los videos: revisar con y sin él.

## Estado (24 oct 2026)

- Giro gimnasio: las 3 demos hechas y publicadas (ver `docs/gym/`).
- Cuarta ronda (25 oct): 7 disciplinas, fachada con día y noche en "Un día", vestidores nuevos, planes Grafito/Oro/Ónix, recorrido del club con 14 fotos reales en alta definición, hover con profundidad y transición de luces, sección Atelier con merch, videos de caminadora, rack, edit y piso, foto del reformer sin fondo verde, cursor visible en el visor de fotos y datos de contacto creíbles. Repositorio: https://github.com/BrunoDunay/Demos-de-gimnasio (las apps de Vercel se publican desde ahí).
- Tercera ronda (24 oct): portada limpia, manifiesto sin cortina, Ride con fotos nuevas, "Un día" con 11 momentos y puertas con profundidad, planes Pórtico/Atrio/Santuario con herencia visible, humo en el cierre, botones nuevos y recorrido del club con fotos reales en 3D (faltan 4 zonas por el límite de Hugging Face).
- Segunda ronda (24 oct): Umbral con intro nueva, club 3D, hero nuevos en Disciplinas, Membresías y Contacto, secciones interactivas en el inicio y más beneficios por plan; cursores nuevos en Forja y Umbral; sin nombre gigante en los pies; glosario de Forja con figuras fluidas.
- El Básico se hizo como gimnasio de barrio (las referencias eran de gimnasio); la nutrióloga queda pendiente para cuando haya referencias.
- Pendiente: nutrióloga, los otros 3 giros (eventos, restaurante, fotografía), PDF de cotización genérico y la sección de demos en el portafolio.
