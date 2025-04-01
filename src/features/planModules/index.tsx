import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';

interface PlanModuleState {
  status: string;
  isSubmitting: boolean;
  modules: components['schemas']['Module'][];
}

const initialState = {
  status: 'draft',
  isSubmitting: false,
  modules: [],
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
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
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

export const useSetSubmitting = () => {
  const dispatch = useAppDispatch();
  return (isSubmitting: boolean) =>
    dispatch(planModuleSlice.actions.setSubmitting(isSubmitting));
};

export const useSetStatus = () => {
  const dispatch = useAppDispatch();
  return (newStatus: string) =>
    dispatch(planModuleSlice.actions.setStatus(newStatus));
};

export const { setModules } = planModuleSlice.actions;
export default planModuleSlice.reducer;
