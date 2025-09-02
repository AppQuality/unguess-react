import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const initialTabName = location.hash.replace('#', '');
  let initialTab = PLAN_TABS.find((t) => t.name === initialTabName);

  if (!initialTab) {
    [initialTab] = PLAN_TABS;
    window.location.hash = `#${initialTab.name}`;
  }
  const [activeTab, setActiveTabState] = useState<PlanTab>(initialTab);
  const [newModule, setNewModule] = useState<string | null>(null);
  const [checkoutItem, setCheckoutItem] =
    useState<GetPlansByPidCheckoutItemApiResponse>(
      {} as GetPlansByPidCheckoutItemApiResponse
    );

  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  // Overloaded setActiveTab function
  const setActiveTab = (tab: PlanTab | PlanTabName) => {
    let tabObj: PlanTab | undefined;
    if (typeof tab === 'string') {
      tabObj = PLAN_TABS.find((t) => t.name === tab);
    } else {
      tabObj = tab;
    }
    if (tabObj) {
      setActiveTabState(tabObj);
      window.location.hash = `#${tabObj.name}`;
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
