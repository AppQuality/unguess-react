import { useEffect, useMemo } from 'react';

/**
 * Sets the video player's currentTime based on the observation anchor in the URL.
 * @param observations List of observations (array of objects with id and start)
 * @param videoRef Ref to the HTMLVideoElement
 * @returns startTime (number)
 */
export function useSetStartTimeFromObservation(
  observations: { id: number; start: number }[] | undefined,
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const startTime = useMemo(() => {
    const url = window.location.href;
    const urlAnchor = url.split('#')[1];
    if (urlAnchor) {
      const observationId = parseInt(urlAnchor.replace('observation-', ''), 10);
      return observations?.find((obs) => obs.id === observationId)?.start || 0;
    }
    return 0;
  }, [observations]);

  // Effect to set the video player's currentTime based only on the startTime, regardless of observations changing
  useEffect(() => {
    if (!videoRef.current) return;
    if (startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime, videoRef.current]);

  return startTime;
}
