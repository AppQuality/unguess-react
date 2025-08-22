import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { GetPlansByPidCheckoutItemApiResponse } from 'src/features/api';
import { PLAN_TABS, PlanTab, PlanTabName } from '../common/constants';

interface PlanContextProps {
  activeTab: PlanTab;
  setActiveTab: (tab: PlanTab | PlanTabName) => void;
  setIsSaveTemplateModalOpen: (isOpen: boolean) => void;
  isSaveTemplateModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  isDeleteModalOpen: boolean;
  newModule: string | null;
  setNewModule: (module: string | null) => void;
  setCheckoutItem: (checkoutItem: GetPlansByPidCheckoutItemApiResponse) => void;
  checkoutItem: GetPlansByPidCheckoutItemApiResponse;
  setIsPaymentInProgress: (isInProgress: boolean) => void;
  isPaymentInProgress: boolean;
}

const PlanContext = createContext<PlanContextProps | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTabState] = useState<PlanTab>(PLAN_TABS[0]);
  const [newModule, setNewModule] = useState<string | null>(null);
  const [checkoutItem, setCheckoutItem] =
    useState<GetPlansByPidCheckoutItemApiResponse>(
      {} as GetPlansByPidCheckoutItemApiResponse
    );

  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  // Overloaded setActiveTab function
  const setActiveTab = (tab: PlanTab | PlanTabName) => {
    if (typeof tab === 'string') {
      const foundTab = PLAN_TABS.find((t) => t.name === tab);
      if (foundTab) setActiveTabState(foundTab);
    } else {
      setActiveTabState(tab);
    }
  };
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const planContextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
      setIsDeleteModalOpen,
      isDeleteModalOpen,
      newModule,
      setNewModule,
      setCheckoutItem,
      checkoutItem,
      setIsPaymentInProgress,
      isPaymentInProgress,
    }),
    [
      activeTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
      setIsDeleteModalOpen,
      isDeleteModalOpen,
      newModule,
      setNewModule,
      setCheckoutItem,
      checkoutItem,
      setIsPaymentInProgress,
      isPaymentInProgress,
    ]
  );

  return (
    <PlanContext.Provider value={planContextValue}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('useTab must be used within a PlanProvider');
  }
  return context;
};
