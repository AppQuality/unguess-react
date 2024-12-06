import {
  Autocomplete,
  DropdownFieldNew as Field,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

import { ReactComponent as FolderIcon } from 'src/assets/icons/folder-icon.svg';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { setExpressProject } from 'src/features/express/expressSlice';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';

export const ProjectDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeWorkspace } = useActiveWorkspace();
  const canAccessWorkspace = useCanAccessToActiveWorkspace();
  const { project, projectLocked } = useAppSelector((state) => state.express);

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
        isCreatable={canAccessWorkspace}
        startIcon={<FolderIcon />}
        {...(projectLocked && project && { isDisabled: true })}
        onCreateNewOption={async (value) => {
          const v = { name: value, id: -1, campaigns_count: 0 };
          dispatch(setExpressProject(v));
          return {
            id: '-1',
            label: value,
            value: v,
          };
        }}
        onOptionClick={({ selectionValue, inputValue }) => {
          if (!inputValue || !selectionValue) return;
          const value = projects.find(
            (prj) => prj.id.toString() === selectionValue
          );
          dispatch(setExpressProject(value));
        }}
        options={(projects || []).map((prj) => ({
          id: prj.id.toString(),
          value: prj.id.toString(),
          label: prj.name,
        }))}
        placeholder={t('__WIZARD_EXPRESS_DEFAULT_ITEM')}
      />
    </Field>
  );
};
