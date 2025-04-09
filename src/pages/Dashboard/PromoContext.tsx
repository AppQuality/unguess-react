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
    return data.items.reduce<PromoContextProps['promoTemplates']>(
      (acc, template) => {
        if ('strapi' in template) {
          acc.push(template);
        }
        return acc;
      },
      []
    );
  }, [data]);

  const PromoContextValue = useMemo(
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
