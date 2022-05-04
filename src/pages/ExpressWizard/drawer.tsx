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
  Card,
  UnorderedList,
} from "@appquality/unguess-design-system";
import styled from "styled-components";
import { ReactComponent as ExpressIcon } from "src/assets/icons/express-icon.svg";
import { ReactComponent as FunctionalIcon } from "src/assets/icons/functional-icon.svg";
import { ReactComponent as BugIcon } from "src/assets/icons/bug-icon.svg";
import { useAppSelector } from "src/app/hooks";
import { ProjectDropdown } from "./projectDropdown";

const Notes = styled(Card)`
  margin-top: ${theme.space.base * 9}px;
  background-color: ${theme.palette.grey[200]};
  padding: ${theme.space.base * 4}px;
`;

const NotesTitle = styled(MD)`
  color: ${theme.palette.teal["M600"]};
  font-weight: ${theme.fontWeights.medium};
`;

const StyledDivider = styled(Divider)`
  background-color: ${theme.palette.grey[200]};
  margin: ${theme.space.base * 4}px 0;
`;

const SelectTitle = styled(MD)`
  padding-top: ${theme.space.base * 3}px;
  margin-bottom: ${theme.space.base * 2}px;
`;

const TagsContainer = styled.div`
  margin-top: ${theme.space.base * 4}px;
`;

const BodyTitle = styled(XXL)`
  margin-top: ${theme.space.base * 6}px;
  margin-bottom: ${theme.space.base * 2}px;
`;

const StyledTag = styled(Tag)`
  margin-right: ${theme.space.base * 2}px;
  margin-bottom: ${theme.space.base * 2}px;

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
`;

export const ExpressDrawer = ({
  onClose,
  onCtaClick,
  ...props
}: {
  onClose: () => void;
  onCtaClick: () => void;
}) => {
  const { t } = useTranslation();

  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const { isDrawerOpen, projectId } = useAppSelector((state) => state.express);


  return (
    <Drawer isOpen={isDrawerOpen} onClose={onClose}>
      <Drawer.Header>{t("__WIZARD_EXPRESS_HEADER_TITLE")}</Drawer.Header>
      <Drawer.Body>
        <BodyTitle>{t("__WIZARD_EXPRESS_BODY_TITLE")}</BodyTitle>
        <Paragraph>{t("__WIZARD_EXPRESS_BODY_PARAGRAPH")}</Paragraph>
        <TagsContainer>
          <StyledTag hue={theme.palette.grey[100]} isPill size={"large"}>
            <StyledTag.Avatar>
              <ExpressIcon />
            </StyledTag.Avatar>
            <span>{t("__WIZARD_EXPRESS_TAG_1_TEXT")}</span>
          </StyledTag>
          <StyledTag hue={theme.palette.grey[100]} isPill size={"large"}>
            <StyledTag.Avatar>
              <FunctionalIcon />
            </StyledTag.Avatar>
            <span>{t("__WIZARD_EXPRESS_TAG_2_TEXT")}</span>
          </StyledTag>
          <StyledTag hue={theme.palette.grey[100]} isPill size={"large"}>
            <StyledTag.Avatar>
              <BugIcon />
            </StyledTag.Avatar>
            <span>{t("__WIZARD_EXPRESS_TAG_3_TEXT")}</span>
          </StyledTag>
        </TagsContainer>
        <StyledDivider />
        <SelectTitle>
          {t("__WIZARD_EXPRESS_BODY_SELECT_PROJECT_TITLE")}
        </SelectTitle>
        <ProjectDropdown />
        <Notes>
          <NotesTitle>{t("__WIZARD_EXPRESS_BODY_NOTES_TITLE")}</NotesTitle>
          <Paragraph>{t("__WIZARD_EXPRESS_BODY_NOTES_PARAGRAPH")}</Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              {t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_1")}
            </UnorderedList.Item>
            <UnorderedList.Item>
              {t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_2")}
            </UnorderedList.Item>
            <UnorderedList.Item>
              {t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_3")}
            </UnorderedList.Item>
            <UnorderedList.Item>
              {t("__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_4")}
            </UnorderedList.Item>
          </UnorderedList>
        </Notes>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button isPrimary isPill onClick={onCtaClick} { ...!projectId && {disabled: true}}>
            {t("__WIZARD_EXPRESS_FOOTER_CONFIRM_BUTTON")}
          </Button>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close onClick={onClose} />
    </Drawer>
  );
};
