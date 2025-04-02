import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';

export type ModuleRecord = {
  [M in components['schemas']['Module'] as M['type']]?: {
    output: M['output'];
    variant: M['variant'];
  };
};

export type ModuleErrors = Record<string, string>;

interface PlanModuleState {
  status: string;
  records: ModuleRecord;
  errors: ModuleErrors;
  currentModules: components['schemas']['Module']['type'][];
  validationFunctions: Record<string, () => Promise<void>>;
}

const initialState = {
  status: 'draft',
  records: {},
  errors: {},
  currentModules: [],
  validationFunctions: {},
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
      state.currentModules = action.payload.map((module) => module.type);
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
        output: (components['schemas']['Module'] & {
          type: T;
        })['output'];
      }>
    ) => {
      const oldVal = state.records[action.payload.type];
      state.records[action.payload.type] = {
        ...oldVal,
        output: action.payload.output,
      };
      if (!state.currentModules.includes(action.payload.type)) {
        state.currentModules.push(action.payload.type);
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
      if (!state.currentModules.includes(action.payload.module.type)) {
        state.currentModules.push(action.payload.module.type);
      }
    },
    removeModule: <T extends components['schemas']['Module']['type']>(
      state: PlanModuleState,
      action: PayloadAction<T>
    ) => {
      const newRecord = { ...state.records };
      delete newRecord[action.payload];
      state.records = newRecord;
      state.currentModules = state.currentModules.filter(
        (module) => module !== action.payload
      );
      const newErrors = { ...state.errors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`${action.payload}.`) || key === action.payload) {
          delete newErrors[`${key}`];
        }
      });
      state.errors = newErrors;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setError(
      state,
      action: PayloadAction<{
        type: string;
        error: Record<string, string>;
      }>
    ) {
      const prevErrors = state.errors ? { ...state.errors } : {};

      Object.keys(prevErrors).forEach((key) => {
        if (
          key.startsWith(`${action.payload.type}.`) ||
          key === action.payload.type
        ) {
          delete prevErrors[`${key}`];
        }
      });
      state.errors = { ...prevErrors, ...action.payload.error };
    },

    addValidationFunction(
      state,
      action: PayloadAction<{ type: string; fn: () => Promise<void> }>
    ) {
      state.validationFunctions[action.payload.type] = action.payload.fn;
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

export const useValidateForm = () => {
  const { t } = useTranslation();
  const validationFunctions = useAppSelector(
    (state) => state.planModules.validationFunctions
  );

  const validateForm = async () => {
    const allErrors: Record<string, string> = {};
    await Promise.all(
      Object.entries(validationFunctions).map(
        async ([moduleType, validate]) => {
          try {
            await validate();
          } catch (error) {
            if (error instanceof Error) {
              allErrors[`${moduleType}`] = error.message;
            }
          }
        }
      )
    );
    if (Object.keys(allErrors).length > 0) {
      const errorMessage = Object.entries(allErrors)
        .map(([moduleType]) => moduleType)
        .join(', ');
      return Promise.reject(
        new Error(`${t('__MODULES_VALIDATION_ERROR_MESSAGE')} ${errorMessage}`)
      );
    }
    return Promise.resolve();
  };

  return { validateForm };
};

export const {
  setModules,
  setVariant,
  setOutput,
  setModule,
  removeModule,
  setError,
  addValidationFunction,
} = planModuleSlice.actions;
export default planModuleSlice.reducer;
