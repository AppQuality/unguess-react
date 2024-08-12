interface Observation {
  usecaseTitle: string;
}

export const getUsecasesFromObservations = (obs: Observation[]): string[] => {
  const usecases = new Set<string>(obs.map((o) => o.usecaseTitle));

  return Array.from(usecases);
};
