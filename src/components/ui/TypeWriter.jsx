'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

export default function TypeWriter({
  phrases,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}) {
  const { displayText, reducedMotion } = useTypewriter(phrases, {
    speed,
    deleteSpeed,
    pauseDuration,
  });

  return (
    <span className="font-mono text-text-secondary" aria-label={phrases[0]}>
      {displayText}
      {!reducedMotion && <span className="cursor-blink ml-0.5 text-accent-green">|</span>}
    </span>
  );
}
