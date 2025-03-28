import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import {
  CpReqTemplate,
  useGetWorkspacesByWidTemplatesQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { v4 as uuidv4 } from 'uuid'; // Import a UUID generator library like 'uuid'

interface TemplatesContextProps {
  projectId: number | null;
  setProjectId: (projectId: number) => void;
  fieldIsTouched: boolean;
  setFieldIsTouched: (fieldIsTouched: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  templatesByCategory: {
    tailored: CpReqTemplate[];
    unguess: CpReqTemplate[];
  };
  selectedTemplate?: SelectedTemplate;
  setSelectedTemplate: (template: CpReqTemplate) => void;
}

interface SelectedTemplate extends CpReqTemplate {
  requirementsItems?: { value: string; id: string }[];
  isTailored: boolean;
}

const TemplatesContext = createContext<TemplatesContextProps | null>(null);

export const isTemplateTailored = (template: CpReqTemplate) =>
  'workspace_id' in template && typeof template.workspace_id === 'number';

export const TemplatesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectId, setProjectId] =
    useState<TemplatesContextProps['projectId']>(null);
  const [fieldIsTouched, setFieldIsTouched] =
    useState<TemplatesContextProps['fieldIsTouched']>(false);
  const [isDrawerOpen, setIsDrawerOpen] =
    useState<TemplatesContextProps['isDrawerOpen']>(false);
  const [selectedTemplate, setTemplate] =
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

  // Function to update the selectedTemplate and add UUIDs to the requirements list
  const setSelectedTemplate = (template: CpReqTemplate) => {
    const updatedTemplate = {
      ...template,
      isTailored: isTemplateTailored(template),
      requirementsItems: template.strapi?.requirements?.list.map(
        (requirement) => ({ value: requirement, id: uuidv4() })
      ),
    };
    setTemplate(updatedTemplate);
  };

  const templatesContextValue = useMemo(
    () => ({
      projectId,
      setProjectId,
      fieldIsTouched,
      setFieldIsTouched,
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      selectedTemplate,
      setSelectedTemplate,
    }),
    [
      projectId,
      setProjectId,
      fieldIsTouched,
      setFieldIsTouched,
      isDrawerOpen,
      setIsDrawerOpen,
      templatesByCategory,
      selectedTemplate,
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
