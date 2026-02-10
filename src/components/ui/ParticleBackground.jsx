'use client';

import { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function subscribeToResize(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function subscribeToReducedMotion(callback) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  const isMobile = useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth < 768,
    () => true
  );

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        color: { value: '#4ade80' },
        links: {
          color: '#4ade80',
          distance: 160,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          outModes: { default: 'bounce' },
        },
        number: {
          value: 70,
          density: { enable: true, area: 800 },
        },
        opacity: { value: 0.5 },
        size: { value: { min: 1.5, max: 3 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.5 } },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init || isMobile || reducedMotion) return null;

  return <Particles id="tsparticles" options={options} className="absolute inset-0 z-0" />;
}
