'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

function subscribeToReducedMotion(callback) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useTypewriter(
  phrases = [],
  { speed = 80, deleteSpeed = 40, pauseDuration = 2000 } = {}
) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const currentPhrase = phrases[phraseIndex] || '';

  const tick = useCallback(() => {
    if (isDeleting) {
      setDisplayText((prev) => prev.slice(0, -1));
      if (displayText.length <= 1) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      if (displayText.length >= currentPhrase.length) {
        setIsTyping(false);
      }
    }
  }, [displayText, isDeleting, currentPhrase, phrases.length]);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) {
      return;
    }

    if (!isTyping && !isDeleting) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
        setIsTyping(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timer);
  }, [tick, isTyping, isDeleting, speed, deleteSpeed, pauseDuration, reducedMotion, phrases]);

  return {
    displayText: reducedMotion ? phrases[0] || '' : displayText,
    isTyping,
    currentPhrase,
    reducedMotion,
  };
}
