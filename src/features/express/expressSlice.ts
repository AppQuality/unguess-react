import { createSlice } from "@reduxjs/toolkit";

export interface ExpressWizardState {
  steps: { [key: string]: Step };
  isOpen?: boolean;
  isDirty?: boolean;
  currentStep?: number;
}

export interface Step {
  data: { [key: string]: string };
  isValid?: boolean;
}

const initialState: ExpressWizardState = {
  isOpen: false,
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
      state.isOpen = true;
    },
    closeWizard: (state) => {
      state.isOpen = false;
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
    },
  },
});

export const {
  openWizard,
  closeWizard,
  setCurrentStep,
  addStep,
  removeStep,
  resetWizard,
} = expressSlice.actions;

export default expressSlice.reducer;
