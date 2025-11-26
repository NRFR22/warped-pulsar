import { useEffect, useState } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number;
  start?: number;
  isActive?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  isActive = true,
}: UseCountUpProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      setCount(current);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start, isActive]);

  return count;
}
