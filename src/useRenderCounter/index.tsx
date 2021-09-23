import { useEffect, useRef } from 'react';

export default function useRenderCounter(label?: string) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.textContent = [
      parseInt(ref.current.textContent || '0', 10) + 1,
      label
    ]
      .filter(Boolean)
      .join(' - ');
  });
  return (
    <span
      style={{
        backgroundColor: '#ccc',
        borderRadius: 4,
        padding: '2px 4px',
        fontSize: '0.8rem',
        margin: '0 6px',
        display: 'inline-block'
      }}
      ref={ref}
    />
  );
}
