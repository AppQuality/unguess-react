export default (unformatted: string) => {
  let d = new Date(unformatted);
  return d.toLocaleString('it', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
