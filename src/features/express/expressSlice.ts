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
}

export interface Step {
  data: { [key: string]: string };
  isValid?: boolean;
}

const initialState: ExpressWizardState = {
  isWizardOpen: false,
  isUseCaseModalOpen: true,
  isDrawerOpen: false,
  steps: {},
  projectLocked: false,
  expressTypeId: 0,
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
} = expressSlice.actions;

export default expressSlice.reducer;
