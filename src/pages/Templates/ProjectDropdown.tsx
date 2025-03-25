import {
  Autocomplete,
  DropdownFieldNew as Field,
  Message,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FolderIcon } from 'src/assets/icons/folder-icon.svg';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useTemplatesContext } from './Context';

export const ProjectDropdown = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { projectId, setProjectId, fieldIsTouched, setFieldIsTouched } =
    useTemplatesContext();
  const { data, isLoading, isFetching } = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id.toString() || '',
  });
  const hasValidationError = useMemo(
    () => fieldIsTouched && typeof projectId !== 'number',
    [fieldIsTouched, projectId]
  );

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
        onBlur={() => setFieldIsTouched(true)}
        onOptionClick={({ selectionValue, inputValue }) => {
          setFieldIsTouched(true);
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
        {...(hasValidationError && { validation: 'error' })}
      />
      {hasValidationError && (
        <Message
          data-qa="error-message"
          validation="error"
          style={{ marginTop: appTheme.space.xs }}
        >
          {t('__TEMPLATES_PAGE_PROJECT_DROPDOWN_ERROR')}
        </Message>
      )}
    </Field>
  );
};
