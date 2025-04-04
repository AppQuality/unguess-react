import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  CpReqTemplate,
  useGetWorkspacesByWidTemplatesQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

interface TemplatesContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  templatesByCategory: {
    tailored: CpReqTemplate[];
    unguess: CpReqTemplate[];
  };
  selectedTemplate?: CpReqTemplate;
  setSelectedTemplate: Dispatch<SetStateAction<CpReqTemplate | undefined>>;
}

const TemplatesContext = createContext<TemplatesContextProps | null>(null);

export const TemplatesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] =
    useState<TemplatesContextProps['isDrawerOpen']>(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplatesContextProps['selectedTemplate']>();

  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
    },
    {
      skip: !activeWorkspace,
    }
  );

  const templatesByCategory = useMemo(() => {
    if (!data) return { tailored: [], unguess: [] };
    return data.items.reduce<TemplatesContextProps['templatesByCategory']>(
      (acc, template) => {
        if (
          'workspace_id' in template &&
          typeof template.workspace_id === 'number'
        ) {
          acc.tailored.push(template);
        } else {
          acc.unguess.push(template);
        }
        return acc;
      },
      { tailored: [], unguess: [] }
    );
  }, [data]);

  const templatesContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      selectedTemplate,
      setSelectedTemplate,
    }),
    [
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      selectedTemplate,
      setSelectedTemplate,
    ]
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

  return context;
};
