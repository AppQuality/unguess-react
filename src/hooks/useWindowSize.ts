import { useLayoutEffect, useState } from 'react';
import { theme } from 'src/app/theme';

function debounce(callback: () => void, wait: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (typeof timer !== 'undefined') clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      callback();
    }, wait);
  };
}

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < parseInt(theme.breakpoints.lg, 10),
  });

  useLayoutEffect(() => {
    const debounceUpdateSize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < parseInt(theme.breakpoints.lg, 10),
      });
    }, 300);

    window.addEventListener('resize', debounceUpdateSize);

    debounceUpdateSize();

    return () => window.removeEventListener('resize', debounceUpdateSize);
  }, []);

  return size;
}
