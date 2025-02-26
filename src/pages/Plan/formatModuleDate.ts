export const formatModuleDate = (date: Date) => {
  return {
    output: date.toISOString(),
    input: date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }),
  };
};
