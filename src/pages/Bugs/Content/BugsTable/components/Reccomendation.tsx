import {
  GlobalAlert,
  Anchor,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { appTheme } from 'src/app/theme';
import {
  GetCampaignsByCidSuggestionsApiResponse,
  usePostCampaignsByCidSuggestionsMutation,
} from 'src/features/api';

export const Reccomendation = ({
  suggestion,
}: GetCampaignsByCidSuggestionsApiResponse) => {
  const [sendMail, { isLoading }] = usePostCampaignsByCidSuggestionsMutation();
  const { addToast } = useToast();
  const handleCtaClick = async () => {
    if (!suggestion || isLoading) {
      return;
    }

    sendMail({ cid: '1', body: { slug: suggestion.slug } })
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
            : t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_EXPERIENCE')}
          ${' '}
          {suggestion.serviceId && (
            <Anchor
              href={`https://app.unguess.io/services/${suggestion.serviceId}`}
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
        label: (() => {
          if (isLoading) return t('__BANNER_CROSS_FUNCTIONAL_CTA_LOADING');
          if (suggestion.slug === 'banner_testing_automation')
            return t('__BANNER_CROSS_FUNCTIONAL_CTA_AUTOMATION');
          return t('__BANNER_CROSS_FUNCTIONAL_CTA_EXPERIENCE');
        })(),
        onClick: handleCtaClick,
      }}
      style={{ marginBottom: appTheme.space.lg }}
    />
  );
};
