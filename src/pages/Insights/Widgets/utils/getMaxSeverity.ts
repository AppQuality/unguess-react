export const getMaxSeverity = (
  Major: number,
  Minor: number,
  Positive: number,
  Observation: number
): { name: string; count: number } => {
  switch (true) {
    case Major > 1:
      return { name: 'Major Issue', count: Major };
    case Minor > 1:
      return { name: 'Minor Issue', count: Minor };
    case Positive > 0:
      return { name: 'Positive Finding', count: Positive };
    case Observation > 0:
      return { name: 'Observation', count: Observation };
    default:
      return { name: ' ', count: 0 };
  }
};
