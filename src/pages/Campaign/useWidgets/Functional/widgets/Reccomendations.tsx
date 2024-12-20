import {
  Button,
  IconButton,
  SpecialCard,
  Tag,
  useToast,
  Notification,
  XL,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { ReactComponent as ImgExperience } from 'src/assets/banner_suggestions/experience.svg';
import { ReactComponent as ImgAutomation } from 'src/assets/banner_suggestions/testing_automation.svg';
import { ReactComponent as IconService } from '@zendeskgarden/svg-icons/src/16/book-open-stroke.svg';
import { ReactComponent as IconMail } from '@zendeskgarden/svg-icons/src/16/email-stroke.svg';
import {
  useGetCampaignsByCidSuggestionsQuery,
  usePostCampaignsByCidSuggestionsMutation,
} from 'src/features/api';
import { Link } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useEffect } from 'react';
import { useSendGTMevent } from 'src/hooks/useGTMevent';

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
`;

export const Suggestions = ({ campaignId }: { campaignId: string }) => {
  const { t } = useTranslation();
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId,
  });
  const [sendMail, { isLoading }] = usePostCampaignsByCidSuggestionsMutation();
  const { addToast } = useToast();

  const sendGTMEvent = useSendGTMevent();

  useEffect(() => {
    if (!suggestions?.suggestion) {
      return;
    }
    sendGTMEvent({
      event: 'reccomendation',
      category: 'campaign',
      action: 'view',
      content: suggestions.suggestion.slug,
    });
  }, [suggestions]);

  const handleCtaClick = async () => {
    if (!suggestions?.suggestion || isLoading) {
      return;
    }

    sendMail({ cid: campaignId, body: { slug: suggestions.suggestion.slug } })
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
            suggestions.suggestion.slug === 'banner_testing_automation'
              ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_TAG')
              : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_TAG')
          }
        >
          {suggestions.suggestion.slug === 'banner_testing_automation'
            ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_TAG')
            : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_TAG')}
        </StyledTagNew>
      </SpecialCard.Meta>
      <>
        {suggestions.suggestion.slug === 'banner_testing_automation' ? (
          <ImgAutomation style={{ width: '100%', height: 'auto' }} />
        ) : (
          <ImgExperience style={{ width: '100%', height: 'auto' }} />
        )}
        <BasicWidget.Description
          header={
            <div style={{ textAlign: 'center' }}>
              {suggestions.suggestion.slug === 'banner_testing_automation'
                ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_HEADER')
                : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_HEADER')}
            </div>
          }
          content={
            <XL isBold style={{ textAlign: 'center' }}>
              {suggestions.suggestion.slug === 'banner_testing_automation'
                ? t('__CAMPAIGN_PAGE_SUGGESTIONS_AUTOMATION_CONTENT')
                : t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_CONTENT')}
            </XL>
          }
          footer=""
        />
        <BasicWidget.Footer noDivider>
          {suggestions.suggestion.serviceId && (
            <Link
              to={`/services/${suggestions.suggestion.serviceId}`}
              onClick={() => {
                sendGTMEvent({
                  event: 'reccomendation',
                  category: 'campaign',
                  action: 'click',
                  target: 'service',
                  content: suggestions.suggestion?.slug,
                });
              }}
            >
              <IconButton>
                <IconService />
              </IconButton>
            </Link>
          )}
          <Button size="small" onClick={handleCtaClick}>
            {isLoading
              ? t('__CAMPAIGN_PAGE_SUGGESTIONS_CTA_LOADING')
              : t('__CAMPAIGN_PAGE_SUGGESTIONS_CTA')}
            <IconMail style={{ marginLeft: appTheme.space.xxs }} />
          </Button>
        </BasicWidget.Footer>
      </>
    </BasicWidget>
  );
};
