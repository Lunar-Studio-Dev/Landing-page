"use client";

import * as React from "react";
import { motion } from "motion/react";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying float vHeight;
  varying float vMouseGlow;

  float height(vec2 p, float t) {
    float h = 0.0;
    h += 0.42 * sin(p.x * 0.55 + t * 0.30 + sin(p.y * 0.40 + t * 0.18) * 1.2);
    h += 0.28 * sin(p.x * 0.90 - t * 0.22 + p.y * 0.65);
    h += 0.12 * sin(p.x * 1.70 + t * 0.45 + p.y * 1.30);
    h += 0.08 * sin(p.y * 2.20 - t * 0.35);

    // cursor ripple: a local swell that radiates from the pointer.
    // uMouseStrength is 0 unless the wave is interactive and hovered,
    // so non-interactive instances are unaffected.
    float md = distance(p, uMouse);
    float infl = exp(-md * md * 0.30) * uMouseStrength;
    h += infl * (0.5 * sin(md * 2.6 - t * 2.4) + 0.25);

    return h;
  }

  void main() {
    vec2 p = position.xy;
    float h = height(p, uTime);

    float eps = 0.12;
    float hx = (height(p + vec2(eps, 0.0), uTime) - height(p - vec2(eps, 0.0), uTime)) / (2.0 * eps);
    float hy = (height(p + vec2(0.0, eps), uTime) - height(p - vec2(0.0, eps), uTime)) / (2.0 * eps);

    vec3 displaced = vec3(p, h);
    vec3 n = normalize(vec3(-hx, -hy, 1.0));

    float md = distance(p, uMouse);
    vMouseGlow = exp(-md * md * 0.30) * uMouseStrength;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vNormal = normalize(normalMatrix * n);
    vViewDir = normalize(-mvPosition.xyz);
    vHeight = h;
    vUv = uv;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uBrand;
  uniform vec3 uSheen;
  uniform float uReveal;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying float vHeight;
  varying float vMouseGlow;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);

    float fres = pow(1.0 - abs(dot(n, v)), 3.0);
    float crest = smoothstep(0.05, 0.95, vHeight);

    vec3 col = uBase;
    col = mix(col, uBrand, crest * 0.95);
    col += uBrand * fres * 0.9;
    col += uSheen * pow(fres, 4.0) * 1.1;
    col += uBrand * pow(crest, 2.5) * 0.6;

    // extra light pooling around the cursor
    col += uBrand * vMouseGlow * 0.55;
    col += uSheen * pow(vMouseGlow, 2.0) * 0.35;

    // melt into the page background before reaching the frame edges,
    // and keep the glow confined to a horizontal band
    float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x)
               * smoothstep(0.0, 0.38, vUv.y) * smoothstep(1.0, 0.52, vUv.y);

    gl_FragColor = vec4(col * edge * uReveal, 1.0);
  }
`;

function createWave(container: HTMLDivElement, { idleReveal = 1 } = {}) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.domElement.className = "block h-full w-full";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0.7, 4.6);
  camera.lookAt(0, -0.15, 0);

  const geometry = new THREE.PlaneGeometry(10, 7, 220, 140);
  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    uniforms: {
      uTime: { value: 0 },
      uBase: { value: new THREE.Color(0.008, 0.02, 0.06) },
      uBrand: { value: new THREE.Color("#4490ff") },
      uSheen: { value: new THREE.Color(0.7, 0.85, 1.0) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uReveal: { value: idleReveal },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -1.32;
  mesh.position.y = -0.75;
  scene.add(mesh);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();

  // pointer interactivity: targets are set by events, the render loop
  // eases the uniforms toward them so enter/move/leave all feel fluid
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const mouseTarget = new THREE.Vector2(0, 0);
  let hovered = false;
  let prevTime = 0;

  const setPointer = (clientX: number, clientY: number) => {
    const rect = renderer.domElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    pointerNdc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointerNdc, camera);
    const hit = raycaster.intersectObject(mesh)[0];
    if (hit) {
      const local = mesh.worldToLocal(hit.point.clone());
      mouseTarget.set(local.x, local.y);
    }
  };

  const setHover = (h: boolean) => {
    hovered = h;
  };

  const render = (time: number) => {
    const dt = Math.min(Math.max(time - prevTime, 0), 0.1);
    prevTime = time;
    const k = 1 - Math.exp(-dt * 5);

    const u = material.uniforms;
    (u.uMouse.value as THREE.Vector2).lerp(mouseTarget, k);
    u.uMouseStrength.value += ((hovered ? 1 : 0) - u.uMouseStrength.value) * k;
    u.uReveal.value += ((hovered ? 1 : idleReveal) - u.uReveal.value) * k;
    u.uTime.value = time;

    renderer.render(scene, camera);
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { render, resize, dispose, setPointer, setHover };
}

type HeroWaveProps = {
  /**
   * Reacts to the pointer: the wave brightens on enter, a ripple follows
   * the cursor, and everything settles back on leave. Events are listened
   * on the parent element (the wave itself is pointer-events-none).
   */
  interactive?: boolean;
  /** Wave intensity while not hovered (only meaningful with `interactive`). */
  idleIntensity?: number;
  /** Entrance fade delay in seconds. */
  appearDelay?: number;
};

function HeroWave({
  interactive = false,
  idleIntensity = 1,
  appearDelay = 0.9,
}: HeroWaveProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wave: ReturnType<typeof createWave>;
    try {
      wave = createWave(container, {
        idleReveal: interactive ? idleIntensity : 1,
      });
    } catch {
      setFailed(true);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // a single, frozen frame at an interesting point in the cycle
      wave.render(4);
    }

    let rafId = 0;
    let visible = true;
    let elapsed = 0;
    let last = 0;

    const loop = (now: number) => {
      elapsed += (now - last) / 1000;
      last = now;
      wave.render(elapsed);
      rafId = requestAnimationFrame(loop);
    };

    const setRunning = (run: boolean) => {
      cancelAnimationFrame(rafId);
      if (run && !reduceMotion) {
        last = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    setRunning(true);

    const onVisibility = () => setRunning(!document.hidden && visible);
    document.addEventListener("visibilitychange", onVisibility);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setRunning(!document.hidden && visible);
    });
    intersection.observe(container);

    const resizeObserver = new ResizeObserver(() => wave.resize());
    resizeObserver.observe(container);

    // the wave div is pointer-events-none, so pointer interactivity is
    // wired to the parent card it lives in
    let host: HTMLElement | null = null;
    const onEnter = () => wave.setHover(true);
    const onLeave = () => wave.setHover(false);
    const onMove = (e: PointerEvent) => wave.setPointer(e.clientX, e.clientY);
    if (interactive && !reduceMotion) {
      host = container.parentElement ?? container;
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointermove", onMove);
    }

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      intersection.disconnect();
      resizeObserver.disconnect();
      if (host) {
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("pointermove", onMove);
      }
      wave.dispose();
    };
  }, [interactive, idleIntensity]);

  if (failed) {
    // no-WebGL fallback: the original static CSS glow
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
      >
        <div className="absolute bottom-[-55%] left-1/2 h-full w-3/4 -translate-x-1/2 rounded-[100%] bg-brand opacity-25 blur-3xl" />
        <div className="absolute bottom-[-65%] left-1/2 h-3/4 w-2/5 -translate-x-1/2 rounded-[100%] bg-brand opacity-50 blur-2xl" />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: appearDelay, duration: 1.4 }}
      className="pointer-events-none absolute inset-0 filter-[blur(3px)]"
    />
  );
}

export { HeroWave };
