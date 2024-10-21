import {
  Button,
  Drawer,
  MD,
  Paragraph,
  Tag,
  UnorderedList,
  XXL,
  theme,
} from '@appquality/unguess-design-system';
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
    },
  });

  // Get localized strapi data
  if (!data) return null;

  const expressData = getLocalizedStrapiData({
    item: data,
    language: i18n.language,
  });

  const onClose = () => {
    dispatch(resetWizard());
    dispatch(resetExpressTypeId());
    dispatch(closeDrawer());
    toggleChat(true);
  };

  if (isError) {
    return null;
  }

  return !isLoading && isDrawerOpen ? (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={onClose}
      restoreFocus={false}
      focusOnMount={false}
    >
      <Drawer.Header>{t('__WIZARD_EXPRESS_HEADER_TITLE')}</Drawer.Header>
      <Drawer.Body>
        <BodyTitle>{expressData.title}</BodyTitle>
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
