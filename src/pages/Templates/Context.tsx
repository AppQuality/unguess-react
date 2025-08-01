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
  GetTemplatesCategoriesApiResponse,
  useGetTemplatesCategoriesQuery,
  useGetWorkspacesByWidTemplatesQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

interface TemplatesContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  categories?: GetTemplatesCategoriesApiResponse;
  templatesByCategory: {
    tailored: CpReqTemplate[];
    categories: Record<number, CpReqTemplate[]>;
  };
  promoTemplates?: CpReqTemplate[];
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
      orderBy: 'order',
      order: 'asc',
    },
    {
      skip: !activeWorkspace,
    }
  );
  const { data: promoData } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'order',
      order: 'asc',
      filterBy: {
        isPromo: 1,
      },
    },
    {
      skip: !activeWorkspace,
    }
  );

  const { data: categories } = useGetTemplatesCategoriesQuery(undefined, {
    skip: !activeWorkspace,
  });

  const templatesByCategory = useMemo(() => {
    if (!data) return { tailored: [], unguess: [], categories: {} };
    const result: TemplatesContextProps['templatesByCategory'] = {
      tailored: [],
      categories: {},
    };
    for (const template of data.items) {
      if (typeof template.workspace_id === 'number') {
        result.tailored.push(template);
      }
      if (typeof template.category_id === 'number') {
        if (!result.categories[template.category_id]) {
          result.categories[template.category_id] = [];
        }
        result.categories[template.category_id].push(template);
      }
    }
    return result;
  }, [data]);

  const templatesContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      categories,
      promoTemplates: promoData?.items || [],
      selectedTemplate,
      setSelectedTemplate,
    }),
    [
      isDrawerOpen,
      setIsDrawerOpen,
      categories,
      templatesByCategory,
      promoData,
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
