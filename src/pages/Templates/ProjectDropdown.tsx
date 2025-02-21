import {
  Autocomplete,
  DropdownFieldNew as Field,
  Message,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FolderIcon } from 'src/assets/icons/folder-icon.svg';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useTemplatesContext } from './Context';

export const ProjectDropdown = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { projectId, setProjectId } = useTemplatesContext();

  // Get workspaces projects from rtk query
  const { data, isLoading, isFetching } = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id.toString() || '',
  });

  const projects = data?.items;

  if (!projects) return null;

  return isLoading || isFetching ? (
    <Skeleton height="32px" width="100%" />
  ) : (
    <Field>
      <Autocomplete
        data-qa="project-dropdown"
        listboxAppendToNode={document.body}
        startIcon={<FolderIcon />}
        onOptionClick={({ selectionValue, inputValue }) => {
          if (!inputValue || !selectionValue) return;
          const value = projects.find(
            (prj) => prj.id.toString() === selectionValue
          );
          if (value) {
            setProjectId(value.id);
          }
        }}
        options={(projects || []).map((prj) => ({
          id: prj.id.toString(),
          value: prj.id.toString(),
          label: prj.name,
          isSelected: projectId === prj.id,
        }))}
        placeholder={t('__TEMPLATES_PAGE_PROJECT_DROPDOWN_PLACEHOLDER')}
        selectionValue={projectId?.toString() || ''}
        {...(!projectId && { validation: 'error' })}
      />
      {!projectId && (
        <Message validation="error" style={{ marginTop: appTheme.space.xs }}>
          {t('__TEMPLATES_PAGE_PROJECT_DROPDOWN_ERROR')}
        </Message>
      )}
    </Field>
  );
};
