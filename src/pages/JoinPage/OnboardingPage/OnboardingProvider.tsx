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

export interface OnboardingUserData {
  email?: string;
  password?: string;
  profileId?: number;
  token?: string;
  type: 'new' | 'invite';
}

interface OnboardingContextType {
  step: number;
  data: OnboardingData;
  userData: OnboardingUserData;
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

interface OnboardingProviderProps {
  userData: OnboardingUserData;
  children: (context: OnboardingContextType) => ReactNode;
}

export const OnboardingProvider = ({
  userData,
  children,
}: OnboardingProviderProps) => {
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
      userData,
      updateData,
    }),
    [step, data, userData]
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
