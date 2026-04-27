import { useEffect, useMemo } from 'react';

function parseTimeParam(t: string): number {
  if (/^\d+$/.test(t)) return parseInt(t, 10);

  let total = 0;
  if (!/^[\dhms]+$/.test(t)) return 0;

  const h = t.match(/(\d+)h/);
  const m = t.match(/(\d+)m/);
  const s = t.match(/(\d+)s/);

  if (h) total += parseInt(h[1], 10) * 3600;
  if (m) total += parseInt(m[1], 10) * 60;
  if (s) total += parseInt(s[1], 10);
  return total;
}

export function useSetStartTimeFromObservation(
  observations: { id: number; start: number }[] | undefined,
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const startTime = useMemo(() => {
    const url = new URL(window.location.href);

    const tParam = url.searchParams.get('t');
    if (tParam) {
      const seconds = parseTimeParam(tParam);
      if (seconds > 0) return seconds;
    }

    if (observations) {
      const urlAnchor = url.hash.replace('#', '');
      if (urlAnchor) {
        const observationId = parseInt(
          urlAnchor.replace('observation-', ''),
          10
        );
        return observations.find((obs) => obs.id === observationId)?.start || 0;
      }
    }

    return 0;
  }, [observations]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime, videoRef.current]);

  return startTime;
}
