import {
  Autocomplete,
  DropdownFieldNew as Field,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

import { useEffect, useState } from 'react';
import { ReactComponent as FolderIcon } from 'src/assets/icons/folder-icon.svg';
import { ReactComponent as AddIcon } from 'src/assets/icons/grid-add.svg';
import { Project, useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { setExpressProject } from 'src/features/express/expressSlice';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import useDebounce from 'src/hooks/useDebounce';

export const ProjectDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeWorkspace } = useActiveWorkspace();

  const { project, projectLocked } = useAppSelector((state) => state.express);

  // Get workspaces projects from rtk query
  const { data, isLoading, isFetching } = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id.toString() || '',
  });

  const projects = data?.items || [];

  // Get projects
  const placeholder: Project = {
    id: 0,
    name: t('__WIZARD_EXPRESS_DEFAULT_ITEM'),
    campaigns_count: 0,
    workspaceId: 0,
  };

  const [selectedItem, setSelectedItem] = useState<Project>();
  const [inputValue, setInputValue] = useState('');
  const [matchingOptions, setMatchingOptions] = useState(projects);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);

  const filterMatchingOptions = (value: string) => {
    const matchedOptions = projects.filter(
      (prj) =>
        prj.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
    );

    setMatchingOptions(matchedOptions);
  };

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
    if (project && project.id) {
      const selectedProject = projects.find((p) => p.id === project.id);
      if (selectedProject) {
        setSelectedItem(selectedProject);
      }
    } else {
      setSelectedItem(undefined);
    }
  }, [debouncedInputValue, project, projects]);

  return isLoading || isFetching ? (
    <Skeleton height="32px" width="100%" />
  ) : (
    <Field>
      <Autocomplete
        startIcon={<FolderIcon />}
        {...(projectLocked && project && selectedItem && { disabled: true })}
        options={[]}
      />
    </Field>
  );
};
