import { useTranslation } from 'react-i18next';
import {
  theme,
  Drawer,
  XXL,
  Paragraph,
  Tag,
  MD,
  UnorderedList,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { ReactComponent as BugIcon } from 'src/assets/icons/bug-icon.svg';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeDrawer, resetWizard } from 'src/features/express/expressSlice';
import { toggleChat } from 'src/common/utils';
import { ProjectDropdown } from './projectDropdown';
import { WaterButton } from './waterButton';
import { CardDivider } from './cardDivider';
import { Notes, NotesTitle } from './notesCard';

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

export const ExpressDrawer = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(resetWizard());
    dispatch(closeDrawer());
    toggleChat(true);
  };

  const { isDrawerOpen, project } = useAppSelector((state) => state.express);

  return (
    <Drawer isOpen={isDrawerOpen} onClose={onClose}>
      <Drawer.Header>{t('__WIZARD_EXPRESS_HEADER_TITLE')}</Drawer.Header>
      <Drawer.Body>
        <BodyTitle>{t('__WIZARD_EXPRESS_BODY_TITLE')}</BodyTitle>
        <Paragraph>{t('__WIZARD_EXPRESS_BODY_PARAGRAPH')}</Paragraph>
        <TagsContainer>
          <StyledTag hue={theme.palette.grey[100]} isPill size="large">
            <StyledTag.Avatar>
              <ExpressIcon />
            </StyledTag.Avatar>
            <span>{t('__WIZARD_EXPRESS_TAG_1_TEXT')}</span>
          </StyledTag>
          <StyledTag hue={theme.palette.grey[100]} isPill size="large">
            <StyledTag.Avatar>
              <FunctionalIcon />
            </StyledTag.Avatar>
            <span>{t('__WIZARD_EXPRESS_TAG_2_TEXT')}</span>
          </StyledTag>
          <StyledTag hue={theme.palette.grey[100]} isPill size="large">
            <StyledTag.Avatar>
              <BugIcon />
            </StyledTag.Avatar>
            <span>{t('__WIZARD_EXPRESS_TAG_3_TEXT')}</span>
          </StyledTag>
        </TagsContainer>
        <CardDivider />
        <SelectTitle>
          {t('__WIZARD_EXPRESS_BODY_SELECT_PROJECT_TITLE')}
        </SelectTitle>
        <ProjectDropdown />
        <Notes style={{ marginTop: `${theme.space.base * 9  }px` }}>
          <NotesTitle>{t('__WIZARD_EXPRESS_BODY_NOTES_TITLE')}</NotesTitle>
          <Paragraph>{t('__WIZARD_EXPRESS_BODY_NOTES_PARAGRAPH')}</Paragraph>
          <UnorderedList>
            <UnorderedList.Item>
              {t('__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_1')}
            </UnorderedList.Item>
            <UnorderedList.Item>
              {t('__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_2')}
            </UnorderedList.Item>
            <UnorderedList.Item>
              {t('__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_3')}
            </UnorderedList.Item>
            <UnorderedList.Item>
              {t('__WIZARD_EXPRESS_BODY_NOTES_LIST_ITEM_4')}
            </UnorderedList.Item>
          </UnorderedList>
        </Notes>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <WaterButton
            isPrimary
            isPill
            onClick={onCtaClick}
            {...(!project && { disabled: true })}
          >
            {t('__WIZARD_EXPRESS_FOOTER_CONFIRM_BUTTON')}
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close onClick={onClose} />
    </Drawer>
  );
};
