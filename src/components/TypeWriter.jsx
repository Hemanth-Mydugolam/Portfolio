import { useState, useEffect, useRef } from 'react';

export default function TypeWriter({ sequence, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing');
  const [seqIndex, setSeqIndex] = useState(0);
  const timeoutRef = useRef(null);

  const texts = sequence.filter((_, i) => i % 2 === 0);
  const delays = sequence.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    const currentText = texts[seqIndex % texts.length];

    if (phase === 'typing') {
      if (displayed.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentText.slice(0, displayed.length + 1));
        }, 60);
      } else {
        const hold = delays[seqIndex % delays.length] || 2000;
        timeoutRef.current = setTimeout(() => setPhase('deleting'), hold);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, 35);
      } else {
        setSeqIndex((i) => i + 1);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, phase, seqIndex]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
}
