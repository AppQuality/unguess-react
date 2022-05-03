import { useTranslation } from "react-i18next";
import {
    theme,
    Drawer,
    Button,
    XXL,
    Paragraph,
    Tag,
    Divider,
    MD,
    Dropdown,
    Autocomplete,
    Menu,
    Item,
    Separator,
    MediaFigure,
    MediaBody,
    Card,
    UnorderedList,
} from "@appquality/unguess-design-system";
import styled from "styled-components";
import { Field } from "@zendeskgarden/react-dropdowns";
import { useState } from "react";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ReactComponent as FunctionalIcon } from "src/assets/icons/functional-icon.svg";
import { ReactComponent as BugIcon } from "src/assets/icons/bug-icon.svg";
import { ReactComponent as AddIcon } from "src/assets/icons/grid-add.svg";
import { ReactComponent as FolderIcon } from "src/assets/icons/folder-icon.svg";

interface IItem {
    label: string;
    value: string;
}

const Notes = styled(Card)`
    margin-top: ${theme.space.base * 8}px;
    background-color: ${theme.palette.grey[200]};
    padding: ${theme.space.base * 4}px;
`;

const NotesTitle = styled(MD)`
    color: ${theme.palette.teal["M600"]};
    font-weight: ${theme.fontWeights.medium};
`;

const StyledDivider = styled(Divider)`
    background-color: ${theme.palette.grey[200]};
`;

const SelectTitle = styled(MD)`
    margin: ${theme.space.base * 2}px 0;
`;

const TagsContainer = styled.div`
    margin-top: ${theme.space.base * 4}px;
`;

const BodyTitle = styled(XXL)`
    margin-top: ${theme.space.base * 5}px;
    margin-bottom: ${theme.space.base * 2}px;
`;

export const Wizard = ({
    open,
    onClose,
    onClick,
    type,
    ...props
}: {
    open: boolean;
    onClose: () => void;
    onClick: () => void;
    type?: "express";
}) => {
    const { t } = useTranslation();

    const projects = [
        { label: t("__WIZARD_EXPRESS_DEFAULT_ITEM"), value: "" },
        { label: "Project 1", value: "item-1" },
        { label: "Project 2", value: "item-2" },
        { label: "Project 3", value: "item-3" },
    ];

    const [selectedItem, setSelectedItem] = useState(projects[0]);
    const [inputValue, setInputValue] = useState("");
    const [matchingOptions, setMatchingOptions] = useState(projects);

    if (!type || type === "express") {
        return (
            <Drawer isOpen={open} onClose={onClose}>
                <Drawer.Header>{t("__WIZARD_EXPRESS_HEADER_TITLE")}</Drawer.Header>
                <Drawer.Body>
                    <BodyTitle>{t("__WIZARD_EXPRESS_BODY_TITLE")}</BodyTitle>
                    <Paragraph>{t("__WIZARD_EXPRESS_BODY_PARAGRAPH")}</Paragraph>
                    <TagsContainer>
                        <Tag
                            hue={theme.palette.grey[100]}
                            isPill
                            size={"large"}
                        >
                            <Tag.Avatar>
                                <ExpressIcon />
                            </Tag.Avatar>
                            <span>{t("__WIZARD_EXPRESS_TAG_1_TEXT")}</span>
                        </Tag>
                        <Tag
                            hue={theme.palette.grey[100]}
                            isPill
                            size={"large"}
                        >
                            <Tag.Avatar>
                                <FunctionalIcon />
                            </Tag.Avatar>
                            <span>{t("__WIZARD_EXPRESS_TAG_2_TEXT")}</span>
                        </Tag>
                        <Tag
                            hue={theme.palette.grey[100]}
                            isPill
                            size={"large"}
                        >
                            <Tag.Avatar>
                                <BugIcon />
                            </Tag.Avatar>
                            <span>{t("__WIZARD_EXPRESS_TAG_3_TEXT")}</span>
                        </Tag>
                    </TagsContainer>
                    <StyledDivider />
                    <SelectTitle>{t("__WIZARD_EXPRESS_BODY_SELECT_PROJECT_TITLE")}</SelectTitle>
                    <Dropdown
                        inputValue={inputValue}
                        selectedItem={selectedItem}
                        onSelect={(item: IItem) => {
                            setInputValue("");
                            setSelectedItem(item);
                        }}
                        onInputValueChange={(value) => {
                            setInputValue(value);
                        }}
                        downshiftProps={{ itemToString: (item: IItem) => item && item.label }}
                    >
                        <Field>
                            <Autocomplete
                                start={<FolderIcon />}
                            >
                                {selectedItem.label}
                            </Autocomplete>
                        </Field>
                        <Menu>
                            {matchingOptions.length ? (
                                matchingOptions.map((item) => (
                                    <Item key={item.value} value={item}>
                                        <span>{item.label}</span>
                                    </Item>
                                ))
                            ) : (
                                <Item disabled><span>No matches found</span></Item>
                            )}
                            {inputValue && (
                                <>
                                    <Separator />
                                    <Item key="new" value={inputValue}>
                                        <MediaFigure>
                                            <AddIcon />
                                        </MediaFigure>
                                        <MediaBody>Add {inputValue}</MediaBody>
                                    </Item>
                                </>
                            )}
                        </Menu>
                        <Menu>
                            {matchingOptions.length ? (
                                matchingOptions.map((item) => (
                                    <Item key={item.value} value={item}>
                                        <span>{item.label}</span>
                                    </Item>
                                ))
                            ) : (
                                <Item disabled>No matches found</Item>
                            )}
                        </Menu>
                    </Dropdown>
                    <Notes>
                        <NotesTitle>{t("__WIZARD_EXPRESS_BODY_NOTES_TITLE")}</NotesTitle>
                        <Paragraph>{t("__WIZARD_EXPRESS_BODY_NOTES_PARAGRAPH")}</Paragraph>
                        <UnorderedList>
                            <UnorderedList.Item>{t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_1")}</UnorderedList.Item>
                            <UnorderedList.Item>{t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_2")}</UnorderedList.Item>
                            <UnorderedList.Item>{t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_3")}</UnorderedList.Item>
                            <UnorderedList.Item>{t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_4")}</UnorderedList.Item>
                        </UnorderedList>
                    </Notes>
                </Drawer.Body>
                <Drawer.Footer>
                    <Drawer.FooterItem>
                        <Button isPrimary isPill onClick={() => { alert("Confirm clicked!") }}>
                            Confirm
                        </Button>
                    </Drawer.FooterItem>
                </Drawer.Footer>
                <Drawer.Close onClick={onClose} />
            </Drawer>
        );
    } else {
        return <></>
    }
}