import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEntranceOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  scale?: number;
}

export function useScrollEntrance<T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      x = 0,
      duration = 0.7,
      delay = 0,
      ease = 'power3.out',
      start = 'top 80%',
      scale,
    } = options;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: y,
      x: x,
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    gsap.set(el, { willChange: 'transform, opacity' });

    const tween = gsap.from(el, {
      ...fromVars,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useBatchScrollEntrance<T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.children;
    if (!children.length) return;

    const {
      y = 40,
      x = 0,
      duration = 0.6,
      delay = 0,
      stagger = 0.1,
      ease = 'power3.out',
      start = 'top 80%',
      scale,
    } = options;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: y,
      x: x,
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    gsap.set(children, { willChange: 'transform, opacity' });

    const tween = gsap.from(children, {
      ...fromVars,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}
