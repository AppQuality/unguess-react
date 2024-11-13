import {
  Button,
  IconButton,
  Label,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { ReactComponent as ImgExperience } from 'src/assets/banner_suggestions/experience.svg';
import { ReactComponent as ImgAutomation } from 'src/assets/banner_suggestions/testing_automation.svg';
import { ReactComponent as IconService } from '@zendeskgarden/svg-icons/src/16/book-open-stroke.svg';
import { useGetCampaignsByCidSuggestionsQuery } from 'src/features/api';
import { Link } from 'react-router-dom';

export const Suggestions = ({ campaignId }: { campaignId: string }) => {
  const { t } = useTranslation();
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId,
  });

  const StyledTagNew = styled(Tag)`
    height: ${({ theme }) => theme.space.base * 6}px;
    padding: ${({ theme }) => theme.space.base}px
      ${({ theme }) => theme.space.base * 2}px;
  `;

  if (!suggestions) {
    return null;
  }

  return (
    <BasicWidget>
      <SpecialCard.Meta justifyContent="end">
        <StyledTagNew
          isPill
          size="medium"
          title={t('__CAMPAIGN_PAGE_SUGGESTIONS_TAG')}
        >
          {t('__CAMPAIGN_PAGE_SUGGESTIONS_TAG')}
        </StyledTagNew>
      </SpecialCard.Meta>
      <>
        {suggestions.suggestion === 'banner_testing_automation' ? (
          <ImgAutomation style={{ width: '100%', height: 'auto' }} />
        ) : (
          <ImgExperience style={{ width: '100%', height: 'auto' }} />
        )}
        <BasicWidget.Description
          header={
            suggestions.suggestion === 'banner_testing_automation'
              ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_HEADER')
              : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_HEADER')
          }
          content={
            suggestions.suggestion === 'banner_testing_automation'
              ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_CONTENT')
              : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_CONTENT')
          }
        />
        <BasicWidget.Footer>
          <Link
            to={
              suggestions.suggestion === 'banner_testing_automation'
                ? '/testing-automation'
                : '/experience'
            }
          >
            <IconButton>
              <IconService />
            </IconButton>
          </Link>
          <Button size="small">
            {t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_CTA')}
          </Button>
        </BasicWidget.Footer>
      </>
    </BasicWidget>
  );
};
