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
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { extractStrapiData } from 'src/common/getStrapiData';
import { getLocalizedStrapiData, toggleChat } from 'src/common/utils';
import { STRAPI_URL } from 'src/constants';
import {
  TagItem,
  useGeti18nExpressTypesByIdQuery,
} from 'src/features/backoffice/strapi';
import {
  closeDrawer,
  resetExpressTypeId,
  resetWizard,
} from 'src/features/express/expressSlice';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import i18n from 'src/i18n';
import styled from 'styled-components';
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
  const { isDrawerOpen, project, expressTypeId } = useAppSelector(
    (state) => state.express
  );
  const { data, isLoading, isError } = useGeti18nExpressTypesByIdQuery({
    id: expressTypeId?.toString() || '0',
    populate: {
      tags: {
        populate: '*',
      },
      start_reasons: {
        populate: '*',
      },
      localizations: {
        populate: {
          tags: {
            populate: '*',
          },
          start_reasons: {
            populate: '*',
          },
        },
      },
      express: {
        populate: '*',
      },
    },
  });

  const expressData = getLocalizedStrapiData({
    item: data,
    language: i18n.language,
  });

  const express = getLocalizedStrapiData({
    item: expressData.express,
    language: i18n.language,
  });

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
        category: express.slug,
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
          category: express.slug,
          content: '  ',
        });
        onClose();
      }}
      restoreFocus={false}
      focusOnMount={false}
    >
      <Drawer.Header>{t('__WIZARD_EXPRESS_HEADER_TITLE')}</Drawer.Header>
      <Drawer.Body>
        <BodyTitle isBold>{expressData.title}</BodyTitle>
        <Paragraph>{expressData.description}</Paragraph>
        <TagsContainer>
          {expressData.tags.map((tag: TagItem) => {
            const icon = extractStrapiData(tag.icon);
            return (
              <StyledTag hue="rgba(0,0,0,0)">
                <StyledTag.Avatar>
                  <img
                    key={`tag_${tag.id}`}
                    src={`${STRAPI_URL}${icon.url}`}
                    alt={icon.alternativeText}
                  />
                </StyledTag.Avatar>
                <span>{tag.label}</span>
              </StyledTag>
            );
          })}
        </TagsContainer>
        <CardDivider />
        <SelectTitle>
          {t('__WIZARD_EXPRESS_BODY_SELECT_PROJECT_TITLE')}
        </SelectTitle>
        <ProjectDropdown />
        <Notes style={{ marginTop: `${theme.space.base * 9}px` }}>
          <NotesTitle>{t('__WIZARD_EXPRESS_BODY_NOTES_TITLE')}</NotesTitle>
          <Paragraph>{expressData.before_starting_info}</Paragraph>
          <UnorderedList>
            {expressData.start_reasons.map(
              (reason: { id: number; item: string }) => (
                <UnorderedList.Item>{reason.item}</UnorderedList.Item>
              )
            )}
          </UnorderedList>
        </Notes>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button
            id="express-drawer-start-button"
            isPrimary
            isAccent
            onClick={() => {
              onCtaClick();
              dispatch(closeDrawer());
              sendGTMEvent({
                action: 'express_start',
                event: 'express_navigation',
                category: express.slug,
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
