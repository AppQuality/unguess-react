import {
  GlobalAlert,
  Anchor,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useEffect } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as IconMail } from '@zendeskgarden/svg-icons/src/16/email-stroke.svg';
import {
  GetCampaignsByCidSuggestionsApiResponse,
  usePostCampaignsByCidSuggestionsMutation,
} from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { useParams } from 'react-router-dom';

export const Reccomendation = ({
  suggestion,
}: GetCampaignsByCidSuggestionsApiResponse) => {
  const [sendMail, { isLoading }] = usePostCampaignsByCidSuggestionsMutation();
  const { addToast } = useToast();
  const { campaignId } = useParams();

  const sendGTMEvent = useSendGTMevent();
  useEffect(() => {
    if (!suggestion?.slug) {
      return;
    }
    sendGTMEvent({
      event: 'reccomendation',
      category: 'bugs',
      action: 'view',
      content: suggestion.slug,
    });
  }, [suggestion?.slug]);

  const handleCtaClick = async () => {
    if (!suggestion || isLoading) {
      return;
    }

    sendGTMEvent({
      event: 'reccomendation',
      category: 'bugs',
      action: 'click',
      content: suggestion.slug,
      target: 'get_in_touch',
    });

    sendMail({ cid: campaignId || '0', body: { slug: suggestion.slug } })
      .unwrap()
      .then(() =>
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__BANNER_CROSS_FUNCTIONAL_TOAST_SUCCESS')}
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
              title={t('__BANNER_CROSS_FUNCTIONAL_TOAST_ERROR')}
              message={error.message}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        )
      );
  };

  const getCtaLabel = (slug: string) => {
    if (isLoading) return t('__BANNER_CROSS_FUNCTIONAL_CTA_LOADING');
    if (slug === 'banner_testing_automation') {
      return (
        <>
          {t('__BANNER_CROSS_FUNCTIONAL_CTA_AUTOMATION')}{' '}
          <IconMail style={{ marginLeft: appTheme.space.xxs }} />
        </>
      );
    }
    return (
      <>
        {t('__BANNER_CROSS_FUNCTIONAL_CTA_EXPERIENCE')}{' '}
        <IconMail style={{ marginLeft: appTheme.space.xxs }} />
      </>
    );
  };

  if (!suggestion) {
    return null;
  }
  return (
    <GlobalAlert
      type={
        suggestion.slug === 'banner_testing_automation' ? 'primary' : 'accent'
      }
      title={
        suggestion.slug === 'banner_testing_automation'
          ? t('__BANNER_CROSS_FUNCTIONAL_TITLE_AUTOMATION')
          : t('__BANNER_CROSS_FUNCTIONAL_TITLE_EXPERIENCE')
      }
      message={
        <>
          {suggestion.slug === 'banner_testing_automation'
            ? t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_AUTOMATION')
            : t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_EXPERIENCE')}{' '}
          {suggestion.serviceId && (
            <Anchor
              href={`https://app.unguess.io/services/${suggestion.serviceId}`}
              onClick={() => {
                sendGTMEvent({
                  event: 'reccomendation',
                  category: 'bugs',
                  action: 'click',
                  content: suggestion.slug,
                  target: 'view_more',
                });
              }}
              isExternal
            >
              {suggestion.slug === 'banner_testing_automation'
                ? t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_AUTOMATION_ANCHOR')
                : t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_EXPERIENCE_ANCHOR')}
            </Anchor>
          )}
        </>
      }
      cta={{
        label: getCtaLabel(suggestion.slug),
        onClick: handleCtaClick,
      }}
      style={{ marginBottom: appTheme.space.lg }}
    />
  );
};
