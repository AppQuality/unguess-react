/**
 * OnboardingProvider - Context per gestire lo stato del flusso onboarding
 * Gestisce i dati e lo step corrente
 */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface OnboardingData {
  name: string;
  surname: string;
  roleId: string;
  companySizeId: string;
  workspace: string;
}

interface OnboardingContextType {
  step: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

interface OnboardingProviderProps {
  children: (context: OnboardingContextType) => ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    surname: '',
    roleId: '',
    companySizeId: '',
    workspace: '',
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const contextValue = useMemo(
    () => ({
      step,
      setStep,
      data,
      updateData,
    }),
    [step, data]
  );

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children(contextValue)}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
