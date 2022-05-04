import { createSlice } from "@reduxjs/toolkit";

export interface ExpressWizardState {
  steps: { [key: string]: Step };
  projectId?: number;
  isWizardOpen?: boolean;
  isDrawerOpen?: boolean;
  isDirty?: boolean;
  currentStep?: number;
}

export interface Step {
  data: { [key: string]: string };
  isValid?: boolean;
}

const initialState: ExpressWizardState = {
  isWizardOpen: false,
  isDrawerOpen: false,
  steps: {
    // what: {
    //   data: {
    //     url: "https://example.com",
    //     firstName: "Peter",
    //     email: "peter@example.com",
    //    }
    // },
    // where: {
    //   data: {
    //     city: "New York",
    //     state: "NY",
    //     country: "USA",
    //   }
    // }
  },
};

const expressSlice = createSlice({
  name: "express",
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
      state.projectId = undefined;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    }
  },
});

export const {
  openWizard,
  closeWizard,
  openDrawer,
  closeDrawer,
  setCurrentStep,
  addStep,
  removeStep,
  resetWizard,
  setProjectId,
} = expressSlice.actions;

export default expressSlice.reducer;
