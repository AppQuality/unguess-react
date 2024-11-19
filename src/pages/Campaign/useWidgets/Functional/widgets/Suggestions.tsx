import {
  Button,
  IconButton,
  SpecialCard,
  Tag,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { ReactComponent as ImgExperience } from 'src/assets/banner_suggestions/experience.svg';
import { ReactComponent as ImgAutomation } from 'src/assets/banner_suggestions/testing_automation.svg';
import { ReactComponent as IconService } from '@zendeskgarden/svg-icons/src/16/book-open-stroke.svg';
import {
  useGetCampaignsByCidSuggestionsQuery,
  usePostCampaignsByCidSuggestionsMutation,
} from 'src/features/api';
import { Link } from 'react-router-dom';

export const Suggestions = ({ campaignId }: { campaignId: string }) => {
  const { t } = useTranslation();
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId,
  });
  const [sendMail, { isLoading }] = usePostCampaignsByCidSuggestionsMutation();
  const { addToast } = useToast();

  const StyledTagNew = styled(Tag)`
    height: ${({ theme }) => theme.space.base * 6}px;
    padding: ${({ theme }) => theme.space.base}px
      ${({ theme }) => theme.space.base * 2}px;
  `;

  const handleCtaClick = async () => {
    if (!suggestions?.suggestion || isLoading) {
      return;
    }

    sendMail({ cid: '1', body: { slug: suggestions.suggestion } })
      .unwrap()
      .then(() =>
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__BANNER_CROSS_TOAST_SUCCESS')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        )
      )
      .catch((error) =>
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              title={t('__BANNER_CROSS_TOAST_ERROR')}
              message={error.message}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        )
      );
  };

  if (!suggestions?.suggestion) {
    return null;
  }

  return (
    <BasicWidget>
      <SpecialCard.Meta justifyContent="end">
        <StyledTagNew
          isPill
          size="medium"
          title={
            suggestions.suggestion === 'banner_testing_automation'
              ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_TAG')
              : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_TAG')
          }
        >
          {suggestions.suggestion === 'banner_testing_automation'
            ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_TAG')
            : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_TAG')}
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
          footer=""
        />
        <BasicWidget.Footer>
          <Link
            to={
              suggestions.suggestion === 'banner_testing_automation'
                ? 'https://app.unguess.io/services/41'
                : 'https://app.unguess.io/services/22'
            }
          >
            <IconButton>
              <IconService />
            </IconButton>
          </Link>
          <Button size="small" onClick={handleCtaClick}>
            {t('__CAMPAIGN_PAGE_SUGGESTIONS_CTA')}
          </Button>
        </BasicWidget.Footer>
      </>
    </BasicWidget>
  );
};
