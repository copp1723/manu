import { useState, useEffect } from 'react';

type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<BreakpointType, string> = {
  'xs': '(max-width: 639px)',
  'sm': '(min-width: 640px)',
  'md': '(min-width: 768px)',
  'lg': '(min-width: 1024px)',
  'xl': '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export function useMediaQuery(breakpoint: BreakpointType): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const query = window.matchMedia(breakpoints[breakpoint]);
    setMatches(query.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, [breakpoint]);

  return matches;
}
