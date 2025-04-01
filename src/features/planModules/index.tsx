import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';

interface PlanModuleState {
  status: string;
  modules: components['schemas']['Module'][];
  errors: Record<string, string>;
}

const initialState = {
  status: 'draft',
  modules: [],
  errors: {},
} satisfies PlanModuleState as PlanModuleState;

const planModuleSlice = createSlice({
  name: 'planModules',
  initialState,
  reducers: {
    setModules: (
      state,
      action: PayloadAction<components['schemas']['Module'][]>
    ) => {
      state.modules = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const usePlanModuleValues = () => {
  const values = useAppSelector((state) => state.planModules);
  return { values };
};

export const useSetModules = () => {
  const dispatch = useAppDispatch();
  return (values: components['schemas']['Module'][]) =>
    dispatch(planModuleSlice.actions.setModules(values));
};

export const useSetStatus = () => {
  const dispatch = useAppDispatch();
  return (newStatus: string) =>
    dispatch(planModuleSlice.actions.setStatus(newStatus));
};

export const { setModules } = planModuleSlice.actions;
export default planModuleSlice.reducer;
