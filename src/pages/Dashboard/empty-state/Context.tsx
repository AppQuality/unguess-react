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

interface ProjectEmptystateContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  promoTemplates: CpReqTemplate[];
  selectedTemplate?: CpReqTemplate;
  setSelectedTemplate: Dispatch<SetStateAction<CpReqTemplate | undefined>>;
}

const ProjectEmptystateContext =
  createContext<ProjectEmptystateContextProps | null>(null);

export const ProjectEmptystateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] =
    useState<ProjectEmptystateContextProps['isDrawerOpen']>(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ProjectEmptystateContextProps['selectedTemplate']>();

  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      filterBy: {
        isPromo: 1,
      },
    },
    {
      skip: !activeWorkspace,
    }
  );

  const promoTemplates = useMemo(() => {
    if (!data) return [];
    return data.items.reduce<ProjectEmptystateContextProps['promoTemplates']>(
      (acc, template) => {
        if ('strapi' in template) {
          acc.push(template);
        }
        return acc;
      },
      []
    );
  }, [data]);

  const ProjectEmptystateContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      promoTemplates,
      selectedTemplate,
      setSelectedTemplate,
    }),
    [
      isDrawerOpen,
      setIsDrawerOpen,
      promoTemplates,
      selectedTemplate,
      setSelectedTemplate,
    ]
  );

  return (
    <ProjectEmptystateContext.Provider value={ProjectEmptystateContextValue}>
      {children}
    </ProjectEmptystateContext.Provider>
  );
};

export const useProjectEmptystateContext = () => {
  const context = useContext(ProjectEmptystateContext);

  if (!context)
    throw new Error('Provider not found for ProjectEmptystateContextProvider');

  return context;
};
