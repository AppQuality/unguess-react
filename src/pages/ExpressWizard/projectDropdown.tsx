import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import {
  Dropdown,
  Autocomplete,
  Menu,
  Item,
  Separator,
  MediaFigure,
  MediaBody,
} from "@appquality/unguess-design-system";

import { Field } from "@zendeskgarden/react-dropdowns";

import { ReactComponent as AddIcon } from "src/assets/icons/grid-add.svg";
import { ReactComponent as FolderIcon } from "src/assets/icons/folder-icon.svg";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";

interface IItem {
    label: string;
    value: string;
  }
  

export const ProjectDropdown = () => {
  const { t } = useTranslation();

  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const { isDrawerOpen, projectId } = useAppSelector((state) => state.express);

  // TODO: API POST new project

  // Get projects
  const projects = [
    { label: t("__WIZARD_EXPRESS_DEFAULT_ITEM"), value: "" },
    { label: "Project 1", value: "1" },
    { label: "Project 2", value: "2" },
    { label: "Project 3", value: "3" },
  ];

  const [selectedItem, setSelectedItem] = useState(projects[0]);
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(projects);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);

  const filterMatchingOptions = (value: string) => {
    const matchedOptions = projects.filter(
      (project) =>
        project.label
          .trim()
          .toLowerCase()
          .indexOf(value.trim().toLowerCase()) !== -1
    );

    setMatchingOptions(matchedOptions);
  };

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <Dropdown
      inputValue={inputValue}
      selectedItem={selectedItem}
      onSelect={(item: IItem) => {
        if (item.value === "new") alert("Create new project");
        setInputValue("");
        setSelectedItem(item);
      }}
      onInputValueChange={(value) => {
        setInputValue(value);
      }}
      downshiftProps={{ itemToString: (item: IItem) => item && item.label }}
    >
      <Field>
        <Autocomplete start={<FolderIcon />}>{selectedItem.label}</Autocomplete>
      </Field>
      <Menu>
        {matchingOptions.length ? (
          matchingOptions.map((item, index) => {
            return index === 0 ? (
              <Item disabled>
                <span>{item.label}</span>
              </Item>
            ) : (
              <Item key={item.value} value={item}>
                <span>{item.label}</span>
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
            <Item key="new" value={{ label: inputValue, value: "new" }}>
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
