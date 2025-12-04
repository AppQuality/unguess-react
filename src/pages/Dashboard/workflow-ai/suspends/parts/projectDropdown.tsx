import {
  Autocomplete,
  DropdownFieldNew as Field,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { ReactComponent as FolderIcon } from 'src/assets/icons/folder-icon.svg';
import { usePostProjectsMutation } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';

export const ProjectDropdown = ({
  projectId,
  setProjectId,
}: {
  projectId: number | null;
  setProjectId: (id: number | null) => void;
}) => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const canAccessWorkspace = useCanAccessToActiveWorkspace();
  const { state: projectFromNavigation } = useLocation();
  const { projectId: pid } = useParams();

  const { data, isLoading, isFetching } = useActiveWorkspaceProjects();
  const [createProject] = usePostProjectsMutation();
  const projects = data?.items;

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
        placeholder={t('__PLAN_CREATION_PROJECT_DROPDOWN_PLACEHOLDER')}
        selectionValue={projectId?.toString() || ''}
        isCreatable={canAccessWorkspace}
        onCreateNewOption={async (value) => {
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
    </Field>
  );
};
