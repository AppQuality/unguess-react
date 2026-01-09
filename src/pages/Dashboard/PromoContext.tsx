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

interface PromoContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  promoTemplates: CpReqTemplate[];
  workspaceStrapiTemplates: CpReqTemplate[];
  workspaceNoStrapiTemplates: CpReqTemplate[];
  selectedTemplate?: CpReqTemplate;
  setSelectedTemplate: Dispatch<SetStateAction<CpReqTemplate | undefined>>;
}

const PromoContext = createContext<PromoContextProps | null>(null);

export const PromoContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] =
    useState<PromoContextProps['isDrawerOpen']>(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PromoContextProps['selectedTemplate']>();

  const { activeWorkspace } = useActiveWorkspace();
  const { data: promoTemplatesData } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      filterBy: {
        isPromo: 1,
      },
      orderBy: 'order',
      order: 'asc',
    },
    {
      skip: !activeWorkspace,
    }
  );
  const { data: workspaceTemplatesData } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'order',
      order: 'asc',
    },
    {
      skip: !activeWorkspace,
    }
  );

  const promoTemplates = useMemo(() => {
    if (!promoTemplatesData) return [];
    return promoTemplatesData.items.reduce<PromoContextProps['promoTemplates']>(
      (acc, template) => {
        if ('strapi' in template) {
          acc.push(template);
        }
        return acc;
      },
      []
    );
  }, [promoTemplatesData]);

  const workspaceStrapiTemplates = useMemo(() => {
    if (!workspaceTemplatesData) return [];
    return workspaceTemplatesData.items
      .filter(
        (template) => template.workspace_id // Filter out global templates (those without a workspace_id)
      )
      .reduce<PromoContextProps['promoTemplates']>((acc, template) => {
        if ('strapi' in template) {
          acc.push(template);
        }
        return acc;
      }, []);
  }, [workspaceTemplatesData]);

  const workspaceNoStrapiTemplates = useMemo(() => {
    if (!workspaceTemplatesData) return [];
    return workspaceTemplatesData.items
      .filter(
        (template) => template.workspace_id // Filter out global templates (those without a workspace_id)
      )
      .reduce<PromoContextProps['promoTemplates']>((acc, template) => {
        if (!('strapi' in template)) {
          acc.push(template);
        }
        return acc;
      }, []);
  }, [workspaceTemplatesData]);

  const PromoContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      promoTemplates,
      workspaceStrapiTemplates,
      workspaceNoStrapiTemplates,
      selectedTemplate,
      setSelectedTemplate,
    }),
    [
      isDrawerOpen,
      setIsDrawerOpen,
      promoTemplates,
      workspaceStrapiTemplates,
      workspaceNoStrapiTemplates,
      selectedTemplate,
      setSelectedTemplate,
    ]
  );

  return (
    <PromoContext.Provider value={PromoContextValue}>
      {children}
    </PromoContext.Provider>
  );
};

export const usePromoContext = () => {
  const context = useContext(PromoContext);

  if (!context) throw new Error('Provider not found for PromoContextProvider');

  return context;
};
