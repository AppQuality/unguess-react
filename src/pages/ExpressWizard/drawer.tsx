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
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  closeDrawer,
  resetExpressTypeId,
  resetWizard,
} from 'src/features/express/expressSlice';
import { getLocalizedStrapiData, toggleChat } from 'src/common/utils';
import {
  useGeti18nExpressTypesByIdQuery,
  TagItem,
} from 'src/features/backoffice/strapi';
import { extractStrapiData } from 'src/common/getStrapiData';
import { STRAPI_URL } from 'src/constants';
import i18n from 'src/i18n';
import { ProjectDropdown } from './projectDropdown';
import { WaterButton } from '../../common/components/waterButton';
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

  return !isLoading ? (
    <Drawer isOpen={isDrawerOpen} onClose={onClose} restoreFocus={false}>
      <Drawer.Header>{t('__WIZARD_EXPRESS_HEADER_TITLE')}</Drawer.Header>
      <Drawer.Body>
        <BodyTitle>{expressData.title}</BodyTitle>
        <Paragraph>{expressData.description}</Paragraph>
        <TagsContainer>
          {expressData.tags.map((tag: TagItem) => {
            const icon = extractStrapiData(tag.icon);
            return (
              <StyledTag hue={theme.palette.grey[100]} isPill size="large">
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
          <WaterButton
            id="express-drawer-start-button"
            isPrimary
            isPill
            onClick={onCtaClick}
            {...(!project && { disabled: true })}
          >
            {t('__WIZARD_EXPRESS_FOOTER_CONFIRM_BUTTON')}
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="express-drawer-close-button" onClick={onClose} />
    </Drawer>
  ) : null;
};
