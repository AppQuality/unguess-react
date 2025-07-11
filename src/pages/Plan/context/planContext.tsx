import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type PlanTab = 'setup' | 'target' | 'instructions' | 'summary';

interface PlanContextProps {
  activeTab: PlanTab;
  setActiveTab: (tab: PlanTab) => void;
  setIsSaveTemplateModalOpen: (isOpen: boolean) => void;
  isSaveTemplateModalOpen: boolean;
}

const PlanContext = createContext<PlanContextProps | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<PlanTab>('setup');
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);

  const planContextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
    }),
    [
      activeTab,
      setActiveTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
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
