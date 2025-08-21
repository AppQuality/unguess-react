import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
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
}

const PlanContext = createContext<PlanContextProps | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTabState] = useState<PlanTab>(PLAN_TABS[0]);
  const [newModule, setNewModule] = useState<string | null>(null);

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
    }),
    [
      activeTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
      setIsDeleteModalOpen,
      isDeleteModalOpen,
      newModule,
      setNewModule,
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
