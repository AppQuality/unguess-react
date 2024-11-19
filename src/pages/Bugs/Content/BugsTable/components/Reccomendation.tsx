import {
  GlobalAlert,
  Anchor,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
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

    sendMail({ cid: '1', body: { slug: suggestion } })
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
      type={suggestion === 'banner_testing_automation' ? 'primary' : 'accent'}
      title={
        suggestion === 'banner_testing_automation'
          ? t('__BANNER_CROSS_FUNCTIONAL_TITLE_AUTOMATION')
          : t('__BANNER_CROSS_FUNCTIONAL_TITLE_EXPERIENCE')
      }
      message={
        <Trans
          i18nKey={
            suggestion === 'banner_testing_automation'
              ? '__BANNER_CROSS_FUNCTIONAL_MESSAGE_AUTOMATION'
              : '__BANNER_CROSS_FUNCTIONAL_MESSAGE_EXPERIENCE'
          }
          components={{
            Anchor: (
              <Anchor
                href={
                  suggestion === 'banner_testing_automation'
                    ? 'https://app.unguess.io/services/41'
                    : 'https://app.unguess.io/services/22'
                }
                isExternal
              />
            ),
          }}
          default="Try out our testing automation services <Anchor>Discover more</Anchor>"
        />
      }
      cta={{
        label: (() => {
          if (isLoading) return t('__BANNER_CROSS_FUNCTIONAL_CTA_LOADING');
          if (suggestion === 'banner_testing_automation')
            return t('__BANNER_CROSS_FUNCTIONAL_CTA_AUTOMATION');
          return t('__BANNER_CROSS_FUNCTIONAL_CTA_EXPERIENCE');
        })(),
        onClick: handleCtaClick,
      }}
      style={{ marginBottom: appTheme.space.lg }}
    />
  );
};
