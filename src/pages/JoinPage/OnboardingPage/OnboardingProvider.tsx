/**
 * OnboardingProvider - Context per gestire lo stato del flusso onboarding
 * Gestisce i dati e lo step corrente
 */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useGetInvitesByProfileAndTokenQuery } from 'src/features/api';

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

export interface QueryParams {
  template?: number;
  [key: string]: string | number | undefined;
}

interface OnboardingContextType {
  step: number;
  data: OnboardingData;
  userData: OnboardingUserData;
  queryParams: QueryParams;
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

interface OnboardingProviderProps {
  userData: OnboardingUserData;
  queryParams?: QueryParams;
  children: (context: OnboardingContextType) => ReactNode;
}

export const OnboardingProvider = ({
  userData,
  queryParams = {},
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

  // Carica i dati dell'invito se è un utente invitato
  const { data: inviteData } = useGetInvitesByProfileAndTokenQuery(
    {
      profile: userData.profileId?.toString() || '',
      token: userData.token || '',
    },
    {
      skip:
        userData.type !== 'invite' || !userData.profileId || !userData.token,
    }
  );

  // Precompila i dati del form con i dati dell'invito
  useEffect(() => {
    if (inviteData && userData.type === 'invite') {
      setData((prev) => ({
        ...prev,
        name: inviteData.name || '',
        surname: inviteData.surname || '',
        workspace: inviteData.workspace || '',
      }));
    }
  }, [inviteData, userData.type]);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const contextValue = useMemo(
    () => ({
      step,
      setStep,
      data,
      userData,
      queryParams,
      updateData,
    }),
    [step, data, userData, queryParams]
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
