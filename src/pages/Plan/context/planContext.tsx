import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export type PlanTab = 'setup' | 'target' | 'instructions' | 'summary';

interface TabContextProps {
  activeTab: PlanTab;
  setActiveTab: (tab: PlanTab) => void;
}

const PlanContext = createContext<TabContextProps | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<PlanTab>('setup');

  const planContextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab, setActiveTab]
  );

  return (
    <PlanContext.Provider value={planContextValue}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanTab = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('useTab must be used within a PlanProvider');
  }
  return context;
};
