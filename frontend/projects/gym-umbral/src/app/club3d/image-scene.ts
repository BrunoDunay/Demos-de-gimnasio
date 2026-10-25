import * as THREE from 'three';
import type { gsap as Gsap } from 'gsap';
import type { Spot, View } from './rooms';

export interface HoverInfo {
  name: string;
  detail: string;
  x: number;
  y: number;
}

export interface ClubScene {
  setProgress(p: number): void;
  setPointer(nx: number, ny: number): void;
  hoverAt(clientX: number, clientY: number): void;
  clearHover(): void;
  setActive(on: boolean): void;
  resize(): void;
  dispose(): void;
}

interface Options {
  views: View[];
  base: string;
  mobile: boolean;
  onReady(): void;
  onHover(info: HoverInfo | null): void;
}

interface Slot {
  view: View;
  color?: THREE.Texture;
  depth?: THREE.Texture;
  aspect: number;
  loading?: Promise<void>;
  dots: HTMLElement[];
}

// Parte de cada vista que se queda quieta antes de pasar a la siguiente (el resto es la transición).
const HOLD = 0.62;
const smooth = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

/**
 * Shader del recorrido. Todo en coordenadas de la foto (0,0 arriba a la izquierda):
 * - cover(): encuadra la foto a la pantalla con paneo y acercamiento.
 * - Hover: con la profundidad se reconstruye la superficie (posición y normal) y una franja de luz
 *   cálida recorre solo el objeto; lo que está detrás o delante a otra distancia no se ilumina.
 * - Transición: la vista actual baja sus luces y la siguiente se "enciende": primero aparecen sus
 *   lámparas y zonas claras y después el resto.
 */
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tA, dA, tB, dB;
  uniform float aspectA, aspectB, viewAspect, zoomA, zoomB, mixT, time;
  uniform vec2 panA, panB, mouse;
  uniform vec2 hUv; uniform float hR, hSweep, hOn;

  vec2 cover(vec2 s, float imgAspect, vec2 pan, float zoom) {
    vec2 size = viewAspect > imgAspect ? vec2(1.0, imgAspect / viewAspect) : vec2(viewAspect / imgAspect, 1.0);
    size /= zoom;
    vec2 c = clamp(pan, size * 0.5, 1.0 - size * 0.5);
    return c + (s - 0.5) * size;
  }
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  vec3 surface(sampler2D d, vec2 uv, float aspect) {
    float z = (1.0 - texture2D(d, uv).r) * 1.4;
    return vec3((uv.x - 0.5) * aspect, uv.y - 0.5, z);
  }

  void main() {
    vec2 s = vec2(vUv.x, 1.0 - vUv.y);
    // Vista actual, con un paralaje mínimo según la profundidad (sin aspecto de modelo 3D).
    vec2 uvA = cover(s, aspectA, panA, zoomA);
    float dA0 = texture2D(dA, uvA).r;
    uvA += mouse * (dA0 - 0.5) * 0.006;
    vec3 colA = texture2D(tA, uvA).rgb;

    if (hOn > 0.001) {
      vec2 px = vec2(1.5 / 1024.0);
      vec3 P = surface(dA, uvA, aspectA);
      vec3 S = surface(dA, hUv, aspectA);
      float fx = surface(dA, uvA + vec2(px.x, 0.0), aspectA).z - surface(dA, uvA - vec2(px.x, 0.0), aspectA).z;
      float fy = surface(dA, uvA + vec2(0.0, px.y), aspectA).z - surface(dA, uvA - vec2(0.0, px.y), aspectA).z;
      vec3 n = normalize(vec3(fx * 120.0, fy * 120.0, -1.0));
      float d3 = distance(P, S);
      float mask = 1.0 - smoothstep(hR * 0.6, hR * 1.05, d3);
      float bandX = S.x - hR + hSweep * 2.0 * hR;
      vec3 L = vec3(bandX, S.y - hR * 0.5, S.z - 0.45);
      float lambert = max(dot(n, normalize(L - P)), 0.0);
      float band = exp(-pow((P.x - bandX) / (hR * 0.16), 2.0));
      float k = mask * hOn;
      colA = colA * (1.0 + k * (0.32 + band * (0.4 + lambert) * 1.5)) + vec3(1.0, 0.78, 0.5) * k * (0.03 + band * 0.12);
    }

    vec3 col = colA;
    if (mixT > 0.0) {
      vec2 uvB = cover(s, aspectB, panB, zoomB);
      vec3 colB = texture2D(tB, uvB).rgb;
      float lumB = dot(colB, vec3(0.299, 0.587, 0.114));
      float n = noise(s * vec2(viewAspect, 1.0) * 5.0 + time * 0.05);
      // Se encienden primero las zonas claras de la nueva vista.
      float th = 1.0 - mixT * 1.45;
      float reveal = smoothstep(th, th + 0.22, lumB * 0.82 + n * 0.18);
      vec3 dimA = colA * (1.0 - smoothstep(0.0, 0.6, mixT) * 0.88);
      col = mix(dimA, colB, reveal);
      // Un leve resplandor cálido en el borde de lo que se va encendiendo.
      float edge = smoothstep(th - 0.05, th + 0.08, lumB * 0.82 + n * 0.18) - reveal;
      col += vec3(1.0, 0.8, 0.55) * max(edge, 0.0) * 0.18 * (1.0 - mixT);
    }
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Recorrido del club dentro de las fotos reales. El scroll avanza vista por vista; cada foto tiene
 * un paneo suave y, al pasar a la siguiente, la habitación baja sus luces y se enciende la nueva.
 */
export function createImageScene(container: HTMLElement, gsap: typeof Gsap, opts: Options): ClubScene {
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, opts.mobile ? 1.5 : 2));
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const blank = new THREE.DataTexture(new Uint8Array([11, 10, 8, 255]), 1, 1);
  blank.needsUpdate = true;
  const u = {
    tA: { value: blank as THREE.Texture },
    dA: { value: blank as THREE.Texture },
    tB: { value: blank as THREE.Texture },
    dB: { value: blank as THREE.Texture },
    aspectA: { value: 1.5 },
    aspectB: { value: 1.5 },
    viewAspect: { value: 1.6 },
    zoomA: { value: 1 },
    zoomB: { value: 1 },
    mixT: { value: 0 },
    time: { value: 0 },
    panA: { value: new THREE.Vector2(0.5, 0.5) },
    panB: { value: new THREE.Vector2(0.5, 0.5) },
    mouse: { value: new THREE.Vector2() },
    hUv: { value: new THREE.Vector2(0.5, 0.5) },
    hR: { value: 0.1 },
    hSweep: { value: 0 },
    hOn: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: u, depthTest: false });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  const dotLayer = document.createElement('div');
  dotLayer.className = 'splat-dots';
  container.appendChild(dotLayer);

  const loader = new THREE.TextureLoader();
  const size = opts.mobile ? '-sm' : '';
  const slots: Slot[] = opts.views.map((view) => ({
    view,
    aspect: view.aspect,
    dots: view.spots.map((s) => {
      const d = document.createElement('span');
      d.className = 'splat-dot';
      d.setAttribute('aria-hidden', 'true');
      d.title = s.name;
      dotLayer.appendChild(d);
      return d;
    }),
  }));
  const tex = (url: string) =>
    loader.loadAsync(url).then((t) => {
      t.flipY = false;
      // Sin conversión de color: el shader lee y escribe los valores tal cual vienen en la foto.
      t.colorSpace = THREE.NoColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      return t;
    });
  const load = (i: number) => {
    const s = slots[i];
    if (!s) return Promise.resolve();
    s.loading ??= Promise.all([tex(`${opts.base}${s.view.id}${size}.webp`), tex(`${opts.base}${s.view.id}-depth.webp`)]).then(([c, d]) => {
      s.color = c;
      s.depth = d;
      const img = c.image as { width: number; height: number };
      s.aspect = img.width / img.height;
    });
    return s.loading;
  };

  load(0).then(() => {

    opts.onReady();
    // Las siguientes, en orden y sin competir por la red.
    (async () => {
      for (let i = 1; i < slots.length; i++) await load(i).catch(() => undefined);
    })();
  });

  let target = 0;
  let cur = 0;
  let w = 1;
  let h = 1;
  let active = true;
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const mouse = { x: 0, y: 0, on: false };
  let hovered: { i: number; k: number; spot: Spot } | null = null;
  let sweep: ReturnType<typeof gsap.to> | null = null;
  let current = 0;
  const N = slots.length;

  // Misma cuenta que el shader, en JS: de foto a pantalla y de pantalla a foto.
  const frame = (aspect: number, pan: [number, number], zoom: number) => {
    const va = w / h;
    let sw = va > aspect ? 1 : va / aspect;
    let sh = va > aspect ? aspect / va : 1;
    sw /= zoom;
    sh /= zoom;
    const cx = Math.min(1 - sw / 2, Math.max(sw / 2, pan[0]));
    const cy = Math.min(1 - sh / 2, Math.max(sh / 2, pan[1]));
    return { sw, sh, cx, cy };
  };
  const state = { pan: [0.5, 0.5] as [number, number], zoom: 1, aspect: 1.5 };
  const toScreen = (uu: number, vv: number) => {
    const f = frame(state.aspect, state.pan, state.zoom);
    return { x: ((uu - f.cx) / f.sw + 0.5) * w, y: ((vv - f.cy) / f.sh + 0.5) * h };
  };
  const toImage = (x: number, y: number) => {
    const f = frame(state.aspect, state.pan, state.zoom);
    return { u: f.cx + (x / w - 0.5) * f.sw, v: f.cy + (y / h - 0.5) * f.sh };
  };

  const viewAt = (i: number, t: number) => {
    const v = slots[i].view;
    const e = smooth(t);
    return {
      pan: [v.pan[0][0] + (v.pan[1][0] - v.pan[0][0]) * e, v.pan[0][1] + (v.pan[1][1] - v.pan[0][1]) * e] as [number, number],
      zoom: v.zoom[0] + (v.zoom[1] - v.zoom[0]) * e,
    };
  };

  const setHover = (next: typeof hovered) => {
    if (hovered && (!next || next.spot !== hovered.spot)) {
      sweep?.kill();
      gsap.to(u.hOn, { value: 0, duration: 0.5, ease: 'power2.out' });
      slots[hovered.i].dots[hovered.k]?.classList.remove('is-on');
    }
    if (next && (!hovered || next.spot !== hovered.spot)) {
      const slot = slots[next.i];
      u.hUv.value.set(next.spot.u, next.spot.v);
      u.hR.value = next.spot.r;
      gsap.to(u.hOn, { value: 1, duration: 0.5, ease: 'power2.out' });
      sweep = gsap.fromTo(u.hSweep, { value: 0 }, { value: 1, duration: 1.5, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.4 });
      slot.dots[next.k]?.classList.add('is-on');
    }
    if (!next) opts.onHover(null);
    hovered = next;
  };

  const tick = (now: number) => {
    cur += (target - cur) * 0.085;
    u.time.value = now / 1000;
    if (opts.mobile) {
      ptr.tx = Math.sin(now / 4000) * 0.4;
      ptr.ty = Math.cos(now / 5000) * 0.3;
    }
    ptr.x += (ptr.tx - ptr.x) * 0.05;
    ptr.y += (ptr.ty - ptr.y) * 0.05;
    u.mouse.value.set(ptr.x, ptr.y);

    const pos = cur * (N - 1);
    const i = Math.min(N - 1, Math.max(0, Math.floor(pos)));
    const frac = i === N - 1 ? 0 : pos - i;
    const a = slots[i];
    const b = slots[Math.min(N - 1, i + 1)];
    if (!a.color) load(i);
    if (!b.color) load(i + 1);
    load(i + 2);
    const mixT = i === N - 1 || !b.color ? 0 : smooth((frac - HOLD) / (1 - HOLD));
    const va = viewAt(i, frac);
    const vb = viewAt(i + 1 < N ? i + 1 : i, 0);
    if (a.color) {
      u.tA.value = a.color;
      u.dA.value = a.depth!;
      u.aspectA.value = a.aspect;
    }
    if (b.color) {
      u.tB.value = b.color;
      u.dB.value = b.depth!;
      u.aspectB.value = b.aspect;
    }
    // La vista actual se acerca un poco mientras se apaga; la nueva llega desde un poco más cerca.
    u.zoomA.value = va.zoom * (1 + mixT * 0.06);
    u.panA.value.set(...va.pan);
    u.zoomB.value = vb.zoom * (1.05 - mixT * 0.05);
    u.panB.value.set(...vb.pan);
    u.mixT.value = mixT;
    u.viewAspect.value = w / h;
    state.pan = va.pan;
    state.zoom = u.zoomA.value;
    state.aspect = a.aspect;
    if (i !== current) {
      current = i;
      if (hovered && hovered.i !== i) setHover(null);
    }

    // Puntos de detalle de la vista actual (se ocultan durante la transición).
    const showDots = a.color && mixT < 0.05;
    slots.forEach((s, si) =>
      s.dots.forEach((d, k) => {
        if (si !== i || !showDots) {
          d.style.opacity = '0';
          return;
        }
        const p = toScreen(s.view.spots[k].u, s.view.spots[k].v);
        const inView = p.x > 20 && p.x < w - 20 && p.y > 80 && p.y < h - 20;
        d.style.opacity = inView ? '1' : '0';
        d.style.transform = `translate(${p.x}px, ${p.y}px)`;
      }),
    );

    if (mouse.on && showDots) pick(i);
    else if (hovered) setHover(null);
    if (hovered) {
      const p = toScreen(hovered.spot.u, hovered.spot.v);
      const rPx = (hovered.spot.r / frame(state.aspect, state.pan, state.zoom).sh) * h;
      opts.onHover({ name: hovered.spot.name, detail: hovered.spot.detail, x: p.x, y: p.y - Math.min(rPx * 0.75, 150) });
    }
    renderer.render(scene, camera);
  };

  const pick = (i: number) => {
    const s = slots[i];
    const f = frame(state.aspect, state.pan, state.zoom);
    const m = toImage(mouse.x, mouse.y);
    let best: typeof hovered = null;
    let bestD = Infinity;
    s.view.spots.forEach((spot, k) => {
      // Distancia en la foto, con el ancho corregido por la proporción.
      const d = Math.hypot((m.u - spot.u) * s.aspect, m.v - spot.v);
      const r = Math.max(spot.r, (26 / h) * f.sh);
      if (d < r && d / r < bestD) {
        bestD = d / r;
        best = { i, k, spot };
      }
    });
    setHover(best);
  };

  const resize = () => {
    w = container.clientWidth || 1;
    h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
  };
  resize();
  renderer.setAnimationLoop(tick);

  return {
    setProgress: (p) => (target = p),
    setPointer: (nx, ny) => {
      ptr.tx = nx;
      ptr.ty = ny;
    },
    hoverAt: (x, y) => {
      const r = container.getBoundingClientRect();
      mouse.x = x - r.left;
      mouse.y = y - r.top;
      mouse.on = true;
    },
    clearHover: () => {
      mouse.on = false;
      ptr.tx = 0;
      ptr.ty = 0;
    },
    setActive: (on) => {
      if (on === active) return;
      active = on;
      renderer.setAnimationLoop(on ? tick : null);
    },
    resize,
    dispose: () => {
      renderer.setAnimationLoop(null);
      sweep?.kill();
      for (const s of slots) {
        s.color?.dispose();
        s.depth?.dispose();
      }
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      dotLayer.remove();
    },
  };
}
