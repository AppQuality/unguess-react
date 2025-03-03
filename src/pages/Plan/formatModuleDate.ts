export const formatModuleDate = (date: Date) => {
  return {
    // this is how the module format output to send to the backend
    output: date.toISOString(),
    // this is how the module format input to use in the datepicker component
    input: date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }),
  };
};
