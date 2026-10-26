import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { Motion, hasFinePointer, useGsap } from '../core/motion';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZONES } from './rooms';
import type { ClubScene, HoverInfo } from './image-scene';

// Todas las vistas en orden y a qué zona pertenece cada una.
const VIEWS = ZONES.flatMap((z, zi) => z.views.map((v) => ({ ...v, zone: zi })));
const FIRST = ZONES.map((_, zi) => VIEWS.findIndex((v) => v.zone === zi));

/**
 * Recorrido del club por fotos reales del espacio (ampliadas y con mapa de profundidad): la sección
 * se fija y el scroll avanza vista por vista, de la entrada a recovery. Entre vistas la habitación
 * baja sus luces y se enciende la siguiente. Los puntos de luz marcan objetos: al pasar el cursor, una
 * franja de luz los recorre siguiendo su forma y aparece su ficha. Three.js se descarga solo aquí.
 */
@Component({
  selector: 'app-club-tour',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tour" #root aria-label="Recorrido 3D por el club">
      <div class="pin">
        <div class="stage" #stage></div>
        <div class="vignette"></div>

        <div class="loader" [class.is-hidden]="ready()">
          <img class="loader-bg warm" src="media/club-sm.webp" alt="" />
          <div class="loader-ui">
            <svg viewBox="0 0 40 48" aria-hidden="true"><path d="M8 44V18a12 12 0 0 1 24 0v26" pathLength="1" /><path class="b" d="M20 12v32" /></svg>
            <span>{{ failed() ? 'Tu navegador no muestra el recorrido 3D' : 'Encendiendo el club…' }}</span>
          </div>
        </div>

        <div class="ui container">
          <h1 class="visually-hidden">El club Umbral: recorrido por los estudios</h1>
          <header class="top">
            <span class="label">Recorre el club<span class="long"> · desliza para avanzar</span></span>
            @if (fine) {
              <span class="hint">Pasa el cursor por los puntos de luz</span>
            } @else {
              <span class="hint">Toca los puntos de luz</span>
            }
          </header>

          <div class="zone">
            @for (z of [zones[active()]]; track z.name) {
              <div class="zone-in">
                <span class="kicker">0{{ active() + 1 }} · {{ z.kicker }}</span>
                <h2 class="name">{{ z.name }}</h2>
                <p class="text">{{ z.text }}</p>
                <ul>
                  @for (f of z.facts; track f) {
                    <li>{{ f }}</li>
                  }
                </ul>
              </div>
            }
          </div>

          <nav class="stops" aria-label="Zonas del club">
            @for (z of zones; track z.name; let i = $index) {
              <button type="button" [class.on]="active() === i" (click)="go(i)" [attr.aria-current]="active() === i">
                <i></i><span>{{ z.kicker }}</span>
              </button>
            }
          </nav>
          <div class="bar"><i [style.transform]="'scaleX(' + progress() + ')'"></i></div>
        </div>

        @if (tip(); as t) {
          <div class="tip" [style.transform]="'translate(' + t.x + 'px,' + t.y + 'px)'">
            <b>{{ t.name }}</b>
            <span>{{ t.detail }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .tour { position: relative; height: 100svh; }
    .pin { position: relative; height: 100svh; overflow: hidden; background: #0b0a08; }
    .stage { position: absolute; inset: 0; }
    .vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 55%, transparent 45%, rgb(5 5 4 / 70%) 100%), linear-gradient(180deg, rgb(11 10 8 / 75%) 0%, transparent 22%, transparent 62%, rgb(11 10 8 / 92%) 100%); }
    .loader { position: absolute; inset: 0; z-index: 3; display: grid; place-items: center; transition: opacity 1.2s ease, visibility 0s 1.2s; }
    .loader.is-hidden { opacity: 0; visibility: hidden; }
    .loader-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: blur(18px) brightness(0.35) sepia(0.3); transform: scale(1.1); }
    .loader-ui { position: relative; display: flex; flex-direction: column; align-items: center; gap: 18px; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-2); }
    .loader-ui svg { width: 40px; height: 48px; overflow: visible; }
    .loader-ui path { fill: none; stroke: var(--gold); stroke-width: 1.4; stroke-linecap: round; stroke-dasharray: 1; animation: draw 1.6s ease-in-out infinite alternate; }
    .loader-ui path.b { stroke: var(--glow); stroke-dasharray: none; animation: flicker 1.2s steps(2) infinite; }
    @keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
    @keyframes flicker { 50% { opacity: 0.3; } }

    .ui { position: absolute; inset: 0; z-index: 2; pointer-events: none; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto; padding-top: 110px; padding-bottom: 36px; }
    .top { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
    .hint { font-size: 0.66rem; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--muted); }
    .zone { align-self: end; max-width: 470px; }
    .zone-in { animation: zone-in 900ms var(--ease-out) both; }
    @keyframes zone-in { from { opacity: 0; transform: translateY(26px); filter: blur(6px); } }
    .kicker { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: var(--gold); }
    .name { margin-top: 14px; font-size: clamp(3rem, 6.4vw, 6.2rem); line-height: 0.95; }
    .text { margin-top: 18px; color: var(--ink-2); font-weight: 300; }
    ul { list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    li { padding: 7px 13px; border-radius: 999px; font-size: 0.74rem; color: var(--ink-2); background: rgb(13 12 10 / 55%); box-shadow: inset 0 0 0 1px var(--line-2); backdrop-filter: blur(8px); }
    .stops { align-self: center; display: flex; flex-direction: column; gap: 6px; pointer-events: auto; }
    .stops button { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 0.66rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); transition: color 400ms ease; }
    .stops i { width: 18px; height: 1px; background: currentColor; transition: width 600ms var(--ease-out), background-color 400ms ease; }
    .stops button.on, .stops button:hover { color: var(--ink); }
    .stops button.on i { width: 42px; background: var(--gold); }
    .bar { grid-column: 1 / -1; height: 1px; margin-top: 28px; background: var(--line-2); overflow: hidden; }
    .bar i { display: block; height: 100%; background: var(--gold); transform-origin: left; }
    .tip { position: absolute; left: 0; top: 0; z-index: 4; pointer-events: none; display: flex; flex-direction: column; gap: 3px; margin: -64px 0 0 -110px; width: 220px; padding: 12px 16px; text-align: center; background: rgb(13 12 10 / 78%); backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1px rgb(216 185 138 / 45%); animation: tip-in 400ms var(--ease-out); }
    .tip::after { content: ''; position: absolute; left: 50%; bottom: -14px; width: 1px; height: 14px; background: var(--gold); }
    .tip b { font-family: var(--font-display); font-weight: 400; font-size: 1.3rem; line-height: 1.1; }
    .tip span { font-size: 0.74rem; color: var(--ink-2); }
    @keyframes tip-in { from { opacity: 0; margin-top: -54px; } }
    @media (max-width: 900px) {
      .label .long { display: none; }
      .ui { grid-template-columns: 1fr; padding-top: 96px; }
      .stops { flex-direction: row; flex-wrap: wrap; gap: 4px 16px; align-self: end; margin-top: 18px; }
      .stops button { padding: 6px 0; }
      .zone { max-width: none; }
      .name { font-size: 2.8rem; }
      .text { font-size: 0.92rem; }
      ul { display: none; }
    }
  `,
})
export class ClubTour {
  private readonly motion = inject(Motion);
  private readonly zoneRef = inject(NgZone);
  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  protected readonly zones = ZONES;
  protected readonly active = signal(0);
  protected readonly progress = signal(0);
  protected readonly ready = signal(false);
  protected readonly failed = signal(false);
  protected readonly tip = signal<HoverInfo | null>(null);
  protected readonly fine = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;
  private trigger?: ScrollTrigger;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(async () => {
      const root = this.root().nativeElement;
      const stage = this.stage().nativeElement;
      const { gsap, ScrollTrigger } = useGsap();
      let scene: ClubScene | null = null;
      const mobile = !hasFinePointer() || innerWidth < 760;

      // Fijar la sección y convertir el scroll en avance del recorrido.
      this.trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: () => `+=${innerHeight * 0.85 * VIEWS.length}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          scene?.setProgress(self.progress);
          this.progress.set(self.progress);
          const i = VIEWS[Math.round(self.progress * (VIEWS.length - 1))].zone;
          if (i !== this.active()) this.active.set(i);
        },
      });

      try {
        const mod = await import('./image-scene');
        scene = this.zoneRef.runOutsideAngular(() =>
          mod.createImageScene(stage, gsap, {
            views: VIEWS,
            base: 'media/club2/',
            mobile,
            onReady: () => this.zoneRef.run(() => this.ready.set(true)),
            onHover: (info) => this.zoneRef.run(() => this.tip.set(info)),
          }),
        );
        scene.setProgress(this.trigger.progress);
      } catch {
        this.failed.set(true);
        return;
      }

      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        scene?.setPointer((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
        if (e.pointerType === 'mouse') scene?.hoverAt(e.clientX, e.clientY);
      };
      const tap = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') scene?.hoverAt(e.clientX, e.clientY);
      };
      const leave = () => scene?.clearHover();
      root.addEventListener('pointermove', move, { passive: true });
      root.addEventListener('pointerdown', tap);
      root.addEventListener('pointerleave', leave);
      const resize = () => scene?.resize();
      window.addEventListener('resize', resize);
      // Fuera de pantalla no se dibuja.
      const io = new IntersectionObserver((entries) => scene?.setActive(entries.some((e) => e.isIntersecting)));
      io.observe(root);

      destroyRef.onDestroy(() => {
        root.removeEventListener('pointermove', move);
        root.removeEventListener('pointerdown', tap);
        root.removeEventListener('pointerleave', leave);
        window.removeEventListener('resize', resize);
        io.disconnect();
        scene?.dispose();
      });
    });
    destroyRef.onDestroy(() => this.trigger?.kill());
  }

  protected go(i: number) {
    const st = this.trigger;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (FIRST[i] / (VIEWS.length - 1));
    this.motion.scrollTo(y + 1, false, 0);
  }
}
