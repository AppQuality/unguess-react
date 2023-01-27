export const sortById = (
  a: number,
  b: number,
  order: 'ASC' | 'DESC' = 'ASC'
) => {
  if (a > b) {
    return order === 'ASC' ? 1 : -1;
  }
  if (a < b) {
    return order === 'ASC' ? -1 : 1;
  }
  return 0;
};
