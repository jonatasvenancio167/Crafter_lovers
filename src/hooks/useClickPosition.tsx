import { useState, useEffect } from 'react';

interface Position {
  x: number | null;
  y: number | null;
}

export const UseClickPosition = (): Position => {
  const [position, setPosition] = useState({ x: -1, y: -1 });

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setPosition({ x: event.clientX , y: event.clientY });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return position;
};
