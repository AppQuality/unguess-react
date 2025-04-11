import { getColor } from '@appquality/unguess-design-system';

export const prepareGravatar = (url: string, size?: number) =>
  `${url}?s=${size || 48}`;

export const isMinMedia = (breakpoint: string) =>
  window.matchMedia(`only screen and (min-width: ${breakpoint})`).matches;

export const getColorWithAlpha = (hue: string, alpha: number) =>
  getColor(hue, undefined, undefined, alpha);
