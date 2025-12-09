import {
  Autocomplete,
  DropdownFieldNew as Field,
  Message,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FolderIcon } from 'src/assets/icons/folder-icon.svg';
import { usePostProjectsMutation } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { usePlanCreationContext } from './Context';

export const ProjectDropdown = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const canAccessWorkspace = useCanAccessToActiveWorkspace();
  const { state: projectFromNavigation } = useLocation();
  const { projectId: pid } = useParams();
  const { projectId, setProjectId, fieldIsTouched, setFieldIsTouched } =
    usePlanCreationContext();
  const { data, isLoading, isFetching } = useActiveWorkspaceProjects();
  const [createProject] = usePostProjectsMutation();
  const projects = data?.items;
  const hasValidationError = useMemo(
    () => fieldIsTouched && typeof projectId !== 'number',
    [fieldIsTouched, projectId]
  );

  useEffect(() => {
    if (projectFromNavigation) {
      setProjectId(projectFromNavigation.projectId);
    } else if (pid) {
      setProjectId(Number(pid));
    } else {
      setProjectId(null);
    }
  }, [projectFromNavigation, setProjectId]);

  if (!projects || isLoading || isFetching) return null;

  return isLoading || isFetching ? (
    <Skeleton height="32px" width="100%" />
  ) : (
    <Field>
      <Autocomplete
        key={`project-dropdown${projectId}`}
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
        options={[
          {
            id: 'options-group',
            label: t('__PLAN_CREATION_PROJECT_DROPDOWN_PLACEHOLDER'),
            options: (projects || []).map((prj) => ({
              id: prj.id.toString(),
              value: prj.id.toString(),
              label: prj.name,
              isSelected: projectId === prj.id,
            })),
          },
        ]}
        placeholder={t('__PLAN_CREATION_PROJECT_DROPDOWN_PLACEHOLDER')}
        selectionValue={projectId?.toString() || ''}
        {...(hasValidationError && { validation: 'error' })}
        isCreatable={canAccessWorkspace}
        onCreateNewOption={async (value) => {
          setFieldIsTouched(true);
          const res = await createProject({
            body: {
              name: value,
              customer_id: activeWorkspace?.id ?? -1,
            },
          }).unwrap();
          if (res.id) {
            setProjectId(res.id);
          }
          return {
            id: res.id.toString(),
            value: res.name,
            label: res.name,
          };
        }}
      />
      {hasValidationError && (
        <Message
          data-qa="error-message"
          validation="error"
          style={{ marginTop: appTheme.space.xs }}
        >
          {t('__PLAN_CREATION_PROJECT_DROPDOWN_ERROR')}
        </Message>
      )}
    </Field>
  );
};
