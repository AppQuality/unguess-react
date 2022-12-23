export type TypeFilter = {
  types: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
  };
};

export const getCurrentTypesFilter = (state?: TypeFilter) => ({
  available: state ? state.types.available : [],
  selected: state ? state.types.selected : [],
});

export const setTypesFilter = (
  state: TypeFilter,
  types: { id: number; name: string }[]
) => ({
  types: {
    ...getCurrentTypesFilter(state),
    available: types,
  },
});

export const filterByTypes = (
  state: TypeFilter,
  types: { id: number; name: string }[]
) => ({
  types: {
    ...getCurrentTypesFilter(state),
    selected: types,
  },
});
