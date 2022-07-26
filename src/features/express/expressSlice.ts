import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../api';

export interface ExpressWizardState {
  steps: { [key: string]: Step };
  expressTypeId: number;
  project?: Project;
  projectLocked?: boolean;
  isWizardOpen?: boolean;
  isDrawerOpen?: boolean;
  isUseCaseModalOpen?: boolean;
  isDirty?: boolean;
  currentStep?: number;
  useCases: UseCase[];
  currentUseCase?: UseCase;
}

export interface Step {
  data: { [key: string]: string };
}

export interface UseCase {
  index: number;
  title: string;
  functionality: string;
  logged: boolean;
  description: string;
  link?: string;
}

export const emptyUseCase: UseCase = {
  index: 0,
  title: '',
  functionality: '',
  logged: false,
  description: '',
  link: '',
};

const initialState: ExpressWizardState = {
  isWizardOpen: false,
  isUseCaseModalOpen: false,
  isDrawerOpen: false,
  steps: {},
  projectLocked: false,
  expressTypeId: 0,
  useCases: [],
};

const expressSlice = createSlice({
  name: 'express',
  initialState,
  reducers: {
    openWizard: (state) => {
      state.isWizardOpen = true;
    },
    closeWizard: (state) => {
      state.isWizardOpen = false;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openUseCaseModal: (state) => {
      state.isUseCaseModalOpen = true;
    },
    closeUseCaseModal: (state) => {
      state.isUseCaseModalOpen = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    addStep: (state, action) => {
      state.steps[action.payload.id] = action.payload;
    },
    removeStep: (state, action) => {
      delete state.steps[action.payload];
    },
    resetWizard: (state) => {
      state.steps = {};
      state.project = undefined;
      state.projectLocked = false;
    },
    lockProject: (state) => {
      state.projectLocked = true;
    },
    setExpressProject: (state, action) => {
      state.project = action.payload;
    },
    setExpressTypeId: (state, action) => {
      state.expressTypeId = action.payload;
    },
    resetExpressTypeId: (state) => {
      state.expressTypeId = 0;
    },
    addUseCase: (state, action) => {
      state.useCases.push({ ...action.payload, index: state.useCases.length });
    },
    removeUseCase: (state, action) => {
      state.useCases.splice(0, action.payload);
    },
    clearUseCases: (state) => {
      state.useCases = [];
    },
    setCurrentUseCase: (state, action) => {
      state.currentUseCase = action.payload;
    },
    clearCurrentUseCase: (state) => {
      state.currentUseCase = emptyUseCase;
    },
  },
});

export const {
  openWizard,
  closeWizard,
  openDrawer,
  closeDrawer,
  openUseCaseModal,
  closeUseCaseModal,
  setCurrentStep,
  addStep,
  removeStep,
  resetWizard,
  setExpressProject,
  lockProject,
  setExpressTypeId,
  resetExpressTypeId,
  addUseCase,
  removeUseCase,
  clearUseCases,
  setCurrentUseCase,
  clearCurrentUseCase,
} = expressSlice.actions;

export default expressSlice.reducer;
