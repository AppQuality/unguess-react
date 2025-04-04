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

interface DashboardContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  promoTemplates: CpReqTemplate[];
  selectedTemplate?: CpReqTemplate;
  setSelectedTemplate: Dispatch<SetStateAction<CpReqTemplate | undefined>>;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export const DashboardContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] =
    useState<DashboardContextProps['isDrawerOpen']>(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<DashboardContextProps['selectedTemplate']>();

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
    return data.items.reduce<DashboardContextProps['promoTemplates']>(
      (acc, template) => {
        if ('strapi' in template) {
          acc.push(template);
        }
        return acc;
      },
      []
    );
  }, [data]);

  const DashboardContextValue = useMemo(
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
    <DashboardContext.Provider value={DashboardContextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context)
    throw new Error('Provider not found for DashboardContextProvider');

  return context;
};
