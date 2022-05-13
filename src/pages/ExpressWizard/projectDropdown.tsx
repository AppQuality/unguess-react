import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  Dropdown,
  Autocomplete,
  Menu,
  Item,
  Separator,
  MediaFigure,
  MediaBody,
  Skeleton,
} from "@appquality/unguess-design-system";
import { Field } from "@zendeskgarden/react-dropdowns";

import { ReactComponent as AddIcon } from "src/assets/icons/grid-add.svg";
import { ReactComponent as FolderIcon } from "src/assets/icons/folder-icon.svg";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { useGetWorkspacesByWidProjectsQuery } from "src/features/api";
import { Project } from "src/features/api";
import { setExpressProject } from "src/features/express/expressSlice";

export const ProjectDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const { project, projectLocked } = useAppSelector((state) => state.express);

  //Get workspaces projects from rtk query
  const { data, isLoading, isFetching } = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id || 0,
    limit: 10000,
  });

  const projects = data?.items || [];

  // Get projects
  const placeholder: Project = {
    id: 0,
    name: t("__WIZARD_EXPRESS_DEFAULT_ITEM"),
    campaigns_count: 0,
  };

  const [selectedItem, setSelectedItem] = useState<Project>();
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(projects);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);

  const filterMatchingOptions = (value: string) => {
    const matchedOptions = projects.filter(
      (project) =>
        project.name
          .trim()
          .toLowerCase()
          .indexOf(value.trim().toLowerCase()) !== -1
    );

    setMatchingOptions(matchedOptions);
  };

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
    if (project && project.id) {
      let selectedProject = projects.find((p) => p.id === project.id);
      if (selectedProject) {
        setSelectedItem(selectedProject);
      }
    }else {
      setSelectedItem(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, project, projects]);

  return isLoading || isFetching ? (
    <Skeleton height="32px" width="100%" />
  ) : (
    <Dropdown
      inputValue={inputValue}
      selectedItem={selectedItem}
      onSelect={(item: Project) => {
        if (item && item.id) {
          setInputValue("");
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
      <Menu>
        {matchingOptions.length ? (
          matchingOptions.map((item) => {
            return (
              <Item key={item.id} value={item}>
                <span>{item.name}</span>
              </Item>
            );
          })
        ) : (
          <Item disabled>
            <span>
              {t("__WIZARD_EXPRESS_BODY_SELECT_PROJECT_NO_MATCHING_ITEMS")}
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
                {t("__WIZARD_EXPRESS_BODY_SELECT_PROJECT_ADD_ITEM_LABEL")} "
                {inputValue}"
              </MediaBody>
            </Item>
          </>
        )}
      </Menu>
    </Dropdown>
  );
};
