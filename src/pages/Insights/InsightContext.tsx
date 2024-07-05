import { createContext, useContext, useMemo, useState } from 'react';
import { GetCampaignsByCidObservationsApiArg } from 'src/features/api';

interface InsightContextType {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  groupObservationsBy: GetCampaignsByCidObservationsApiArg['groupBy'];
  setGroupObservationsBy: (
    groupBy: GetCampaignsByCidObservationsApiArg['groupBy']
  ) => void;
}

const InsightContext = createContext<InsightContextType | null>(null);

export const InsightContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [groupBy, setGroupBy] =
    useState<GetCampaignsByCidObservationsApiArg['groupBy']>('usecase-grapes');

  const InsightContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      groupObservationsBy: groupBy,
      setGroupObservationsBy: setGroupBy,
    }),
    [isDrawerOpen, setIsDrawerOpen, groupBy, setGroupBy]
  );

  return (
    <InsightContext.Provider value={InsightContextValue}>
      {children}
    </InsightContext.Provider>
  );
};

export const useInsightContext = () => {
  const context = useContext(InsightContext);

  if (!context)
    throw new Error('Provider not found for InsightContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
