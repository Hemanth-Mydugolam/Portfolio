import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CountUp({ end, suffix = '', duration = 2, delay = 0 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timer = setTimeout(() => {
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [inView, end, duration, delay]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
