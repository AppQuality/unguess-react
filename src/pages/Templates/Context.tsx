import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  CpReqTemplate,
  useGetTemplatesCategoriesQuery,
  useGetWorkspacesByWidTemplatesQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

interface CategoryWithTemplates {
  id: number;
  name: string;
  description?: string;
  templates: CpReqTemplate[];
}

interface TemplatesContextProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  templatesByCategory: CategoryWithTemplates[];
  tailoredTemplates: CpReqTemplate[];
  promoTemplates: CpReqTemplate[];
  selectedTemplate?: CpReqTemplate;
  setSelectedTemplate: Dispatch<SetStateAction<CpReqTemplate | undefined>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResults: CpReqTemplate[];
}

// Helper function to determine if a template is tailored
const isTailoredTemplate = (template: CpReqTemplate) =>
  typeof template.workspace_id === 'number';

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

  const [tailoredTemplates, setTailoredTemplates] = useState<CpReqTemplate[]>(
    []
  );
  const [promoTemplates, setPromoTemplates] = useState<CpReqTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State to hold raw templates categorized by category ID
  // This will be then used to build the templatesByCategory array
  const [rawTemplatesByCategory, setRawTemplatesByCategory] = useState<
    Record<number, CpReqTemplate[]>
  >({});

  // Set raw tailored templates and categorized templates based on the fetched data
  useEffect(() => {
    if (!data) {
      setTailoredTemplates([]);
      setRawTemplatesByCategory({});
      return;
    }
    setTailoredTemplates(data.items.filter(isTailoredTemplate));
    setRawTemplatesByCategory(
      data.items.reduce((result: Record<number, CpReqTemplate[]>, template) => {
        if (!isTailoredTemplate(template)) {
          if (!result[template.category_id]) {
            result[template.category_id] = [];
          }
          result[template.category_id].push(template);
        }
        return result;
      }, {})
    );
  }, [data]);

  // Set promo templates when promoData changes
  useEffect(() => {
    const uniqueTailoredIds = new Set(
      data?.items.filter(isTailoredTemplate).map((template) => template.id)
    );
    setPromoTemplates(
      promoData?.items.filter(
        (template) => !uniqueTailoredIds.has(template.id) // Remove duplicated template ids from promo templates
      ) || []
    );
  }, [promoData, data]);

  // Build array of categories with templates for the frontend
  const templatesByCategory = useMemo(() => {
    if (!categories) return [];
    return categories
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        templates: rawTemplatesByCategory[cat.id] || [],
      }))
      .filter((cat) => cat.templates.length > 0);
  }, [categories, rawTemplatesByCategory]);

  // Search results: flat array from data.items
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!data?.items || !normalizedSearch) return [];
    return data.items.filter((template) => {
      const name =
        (template.strapi?.title || template.name)?.toLowerCase() || '';
      const description =
        (template.strapi?.description || template.description)?.toLowerCase() ||
        '';
      const pre = template.strapi?.pre_title?.toLowerCase() || '';
      return (
        name.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        pre.includes(normalizedSearch)
      );
    });
  }, [data, normalizedSearch]);

  const templatesContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      promoTemplates,
      tailoredTemplates,
      selectedTemplate,
      setSelectedTemplate,
      searchQuery,
      setSearchQuery,
      searchResults,
    }),
    [
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      promoTemplates,
      tailoredTemplates,
      selectedTemplate,
      setSelectedTemplate,
      searchQuery,
      searchResults,
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
