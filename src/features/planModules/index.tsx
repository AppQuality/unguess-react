import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';

export type ModuleRecord = {
  [M in components['schemas']['Module'] as M['type']]?: {
    output: M['output'];
    variant: M['variant'];
  };
};

interface PlanModuleState {
  status: string;
  records: ModuleRecord;
}

const initialState = {
  status: 'draft',
  records: {},
} satisfies PlanModuleState as PlanModuleState;

const planModuleSlice = createSlice({
  name: 'planModules',
  initialState,
  reducers: {
    setModules: (
      state,
      action: PayloadAction<components['schemas']['Module'][]>
    ) => {
      state.records = action.payload.reduce((acc, module) => {
        // @ts-ignore
        acc[module.type] = { output: module.output, variant: module.variant };
        return acc;
      }, {} as ModuleRecord);
    },
    setVariant: <T extends components['schemas']['Module']['type']>(
      state: PlanModuleState,
      action: PayloadAction<{ type: T; variant: string }>
    ) => {
      const oldVal = state.records[action.payload.type];
      if (action.payload.type in state.records && oldVal) {
        state.records[action.payload.type] = {
          ...oldVal,
          variant: action.payload.variant,
        };
      }
    },
    setOutput: <T extends components['schemas']['Module']['type']>(
      state: PlanModuleState,
      action: PayloadAction<{
        type: T;
        output: (components['schemas']['Module'] & { type: T })['output'];
      }>
    ) => {
      const oldVal = state.records[action.payload.type];
      if (action.payload.type in state.records && oldVal) {
        state.records[action.payload.type] = {
          ...oldVal,
          output: action.payload.output,
        };
      }
    },
    setModule: <T extends components['schemas']['Module']['type']>(
      state: PlanModuleState,
      action: PayloadAction<{
        type: T;
        module: components['schemas']['Module'] & { type: T };
      }>
    ) => {
      const newRecords = {
        ...state.records,
        [action.payload.module.type]: {
          output: action.payload.module.output,
          variant: action.payload.module.variant,
        },
      };
      state.records = newRecords;
    },
    removeModule: <T extends components['schemas']['Module']['type']>(
      state: PlanModuleState,
      action: PayloadAction<T>
    ) => {
      const newRecord = { ...state.records };
      delete newRecord[action.payload];
      state.records = newRecord;
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

export const useModuleOutputs = () => {
  const values = useAppSelector((state) => state.planModules.records);
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

export const { setModules, setVariant, setOutput, setModule, removeModule } =
  planModuleSlice.actions;
export default planModuleSlice.reducer;
