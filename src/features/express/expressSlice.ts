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
}

export interface UseCase {
  id: number;
  title: string;
  functionality: string;
  logged: boolean;
  description: string;
  link?: string;
}

export const emptyUseCase: UseCase = {
  id: 0,
  title: '',
  functionality: '',
  logged: false,
  description:
    '<h3>Descrizione della funzionalità</h3><p>Stai per testare la funzionalità “barra di ricerca” il cui scopo è quello di “cercare prodotti”</p><h3>Azioni da compiere per validare il funzionamento</h3><p><strong>Per testare il funzionamento:</strong></p><ul><li><p>Usa la barra di ricerca per cercare contenuti all’interno del sito, sia attraverso stringhe parziali che totali.</p></li><li><p>Usa eventuali opzioni di filtro e ordinamento</p></li></ul><p><strong>Assicurati che</strong><br>I contenuti trovati siano sempre coerenti con quanto desiderato, in base ai loro dettagli</p>',
  link: '',
};

const initialState: ExpressWizardState = {
  isWizardOpen: false,
  isUseCaseModalOpen: false,
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
