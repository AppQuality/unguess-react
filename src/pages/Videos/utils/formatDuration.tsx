export const formatDuration = (duration: number) => {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const minutes = `${min}`.padStart(2, '0');
  const seconds = `${sec}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
};
