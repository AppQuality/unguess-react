import {
  Button,
  Drawer,
  MD,
  Paragraph,
  Tag,
  UnorderedList,
  XL,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { toggleChat } from 'src/common/utils';
import {
  closeDrawer,
  resetExpressTypeId,
  resetWizard,
} from 'src/features/express/expressSlice';
import styled from 'styled-components';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCampaignTemplateById } from 'src/hooks/useCampaignTemplateById';
import { TagItem } from 'src/features/backoffice/strapi';
import { CardDivider } from './cardDivider';
import { Notes, NotesTitle } from './notesCard';
import { ProjectDropdown } from './projectDropdown';

const SelectTitle = styled(MD)`
  padding-top: ${theme.space.base * 3}px;
  margin-bottom: ${theme.space.base * 2}px;
`;

const TagsContainer = styled.div`
  margin-top: ${theme.space.base * 4}px;
  display: flex;
  flex-align: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BodyTitle = styled(XL)`
  margin-top: ${theme.space.xxs};
  margin-bottom: ${theme.space.sm};
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
  const sendGTMEvent = useSendGTMevent();
  const navigate = useNavigate();
  const { isDrawerOpen, project, expressTypeId } = useAppSelector(
    (state) => state.express
  );
  const {
    data: template,
    isLoading,
    isError,
  } = useCampaignTemplateById(expressTypeId.toString());

  const onClose = () => {
    dispatch(resetWizard());
    dispatch(resetExpressTypeId());
    dispatch(closeDrawer());
    toggleChat(true);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      sendGTMEvent({
        action: '',
        event: 'express_navigation',
        category: template.slug,
        content: 'drawer_open',
      });
    }
  }, [isDrawerOpen]);

  if (isError) {
    return null;
  }
  return !isLoading && isDrawerOpen ? (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => {
        sendGTMEvent({
          action: 'drawer_close',
          event: 'express_navigation',
          category: template.slug,
          content: '',
        });
        onClose();
      }}
      restoreFocus={false}
      focusOnMount={false}
    >
      <Drawer.Header>{t('__WIZARD_EXPRESS_HEADER_TITLE')}</Drawer.Header>
      <Drawer.Body>
        <BodyTitle isBold>{template.title}</BodyTitle>
        <Paragraph>{template.description}</Paragraph>
        <TagsContainer>
          {template.tags &&
            template.tags.map((tag: TagItem) => (
              <StyledTag hue="rgba(0,0,0,0)">
                <StyledTag.Avatar>
                  <img key={`tag_${tag.id}`} src={tag.icon} alt={tag.label} />
                </StyledTag.Avatar>
                <span>{tag.label}</span>
              </StyledTag>
            ))}
          {template.price && (
            <StyledTag hue="rgba(0,0,0,0)">
              <StyledTag.Avatar>
                <img
                  key={`tag_${template.slug}_price`}
                  src={template.price.icon}
                  alt={template.price.label}
                />
              </StyledTag.Avatar>
              <span>{template.price.label}</span>
            </StyledTag>
          )}
        </TagsContainer>
        <CardDivider />
        <SelectTitle>
          {t('__WIZARD_EXPRESS_BODY_SELECT_PROJECT_TITLE')}
        </SelectTitle>
        <ProjectDropdown />
        <Notes style={{ marginTop: `${theme.space.base * 9}px` }}>
          <NotesTitle>{t('__WIZARD_EXPRESS_BODY_NOTES_TITLE')}</NotesTitle>
          <Paragraph>{template.requirements?.description}</Paragraph>
          <UnorderedList>
            {template.requirements?.list &&
              template.requirements?.list.map((reason) => (
                <UnorderedList.Item>{reason.item}</UnorderedList.Item>
              ))}
          </UnorderedList>
        </Notes>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button
            style={{ marginRight: `${theme.space.md}` }}
            id="express-drawer-info-button"
            isPrimary
            isLink
            onClick={() => {
              navigate(`/templates/${expressTypeId}`);
              dispatch(closeDrawer());
            }}
          >
            {t('__WIZARD_EXPRESS_FOOTER_INFO_BUTTON')}
          </Button>
          <Button
            id="express-drawer-start-button"
            isPrimary
            onClick={() => {
              onCtaClick();
              dispatch(closeDrawer());
              sendGTMEvent({
                action: 'express_start',
                event: 'express_navigation',
                category: template.slug,
                content: 'drawer_cta_click',
              });
            }}
            {...(!project && { disabled: true })}
          >
            {t('__WIZARD_EXPRESS_FOOTER_CONFIRM_BUTTON')}
          </Button>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="express-drawer-close-button" onClick={onClose} />
    </Drawer>
  ) : null;
};
