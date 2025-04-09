import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface PlanCreationContextProps {
  projectId: number | null;
  setProjectId: (projectId: number | null) => void;
  fieldIsTouched: boolean;
  setFieldIsTouched: (fieldIsTouched: boolean) => void;
}

const PlanCreationContext = createContext<PlanCreationContextProps | null>(
  null
);

export const PlanCreationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectId, setProjectId] =
    useState<PlanCreationContextProps['projectId']>(null);
  const [fieldIsTouched, setFieldIsTouched] =
    useState<PlanCreationContextProps['fieldIsTouched']>(false);

  const PlanCreationContextValue = useMemo(
    () => ({
      projectId,
      setProjectId,
      fieldIsTouched,
      setFieldIsTouched,
    }),
    [projectId, setProjectId, fieldIsTouched, setFieldIsTouched]
  );

  return (
    <PlanCreationContext.Provider value={PlanCreationContextValue}>
      {children}
    </PlanCreationContext.Provider>
  );
};

export const usePlanCreationContext = () => {
  const context = useContext(PlanCreationContext);

  if (!context)
    throw new Error('Provider not found for PlanCreationContextProvider');

  return context;
};
