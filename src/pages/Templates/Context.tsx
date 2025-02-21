import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

interface TemplatesContextProps {
  projectId: number | null;
  setProjectId: (projectId: number | null) => void;
}

const TemplatesContext = createContext<TemplatesContextProps | null>(null);

export const TemplatesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectId, setProjectId] =
    useState<TemplatesContextProps['projectId']>(null);

  const templatesContextValue = useMemo(
    () => ({
      projectId,
      setProjectId,
    }),
    [projectId, setProjectId]
  );

  return (
    <TemplatesContext.Provider value={templatesContextValue}>
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplatesContext = () => {
  const context = useContext(TemplatesContext);

  if (!context)
    throw new Error('Provider not found for TemplatesContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
