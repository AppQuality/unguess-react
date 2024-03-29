import {
  Autocomplete,
  Dropdown,
  Item,
  MediaBody,
  MediaFigure,
  Menu,
  Separator,
  Skeleton,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
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
    <Dropdown
      inputValue={inputValue}
      selectedItem={selectedItem}
      onSelect={(item: Project) => {
        if (item && item.id) {
          setInputValue('');
          setSelectedItem(item);
          dispatch(setExpressProject(item));
        }
      }}
      onInputValueChange={(value) => {
        setInputValue(value);
      }}
      downshiftProps={{ itemToString: (item: Project) => item && item.name }}
    >
      <Field>
        <Autocomplete
          start={<FolderIcon />}
          {...(projectLocked && project && selectedItem && { disabled: true })}
        >
          {selectedItem ? selectedItem.name : placeholder.name}
        </Autocomplete>
      </Field>
      <Menu style={{ maxHeight: '205px' }}>
        {matchingOptions.length ? (
          matchingOptions.map((item) => (
            <Item key={item.id} value={item}>
              <span>{item.name}</span>
            </Item>
          ))
        ) : (
          <Item disabled>
            <span>
              {t('__WIZARD_EXPRESS_BODY_SELECT_PROJECT_NO_MATCHING_ITEMS')}
            </span>
          </Item>
        )}
        {inputValue && (
          <>
            <Separator />
            <Item
              key="new"
              value={{ name: inputValue, id: -1, campaigns_count: 0 }}
            >
              <MediaFigure>
                <AddIcon />
              </MediaFigure>
              <MediaBody>
                {t('__WIZARD_EXPRESS_BODY_SELECT_PROJECT_ADD_ITEM_LABEL')}&nbsp;
                &quot;
                {inputValue}&quot;
              </MediaBody>
            </Item>
          </>
        )}
      </Menu>
    </Dropdown>
  );
};
