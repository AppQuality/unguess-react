import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type PlanTabName = 'setup' | 'target' | 'instructions' | 'summary';
export type PlanTab = { name: PlanTabName; order: number; title: string };

// keep order updated for animations and navigation
export const PLAN_TABS: PlanTab[] = [
  { name: 'setup', order: 0, title: '__PLAN_PAGE_TAB_SETUP_TAB_TITLE' },
  { name: 'target', order: 1, title: '__PLAN_PAGE_TAB_TARGET_TAB_TITLE' },
  {
    name: 'instructions',
    order: 2,
    title: '__PLAN_PAGE_TAB_INSTRUCTIONS_TAB_TITLE',
  },
  { name: 'summary', order: 3, title: '__PLAN_PAGE_TAB_SUMMARY_TAB_TITLE' },
];

interface PlanContextProps {
  activeTab: PlanTab;
  setActiveTab: (tab: PlanTab | PlanTabName) => void;
  setIsSaveTemplateModalOpen: (isOpen: boolean) => void;
  isSaveTemplateModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  isDeleteModalOpen: boolean;
}

const PlanContext = createContext<PlanContextProps | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTabState] = useState<PlanTab>(PLAN_TABS[0]);

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
    }),
    [
      activeTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
      setIsDeleteModalOpen,
      isDeleteModalOpen,
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
