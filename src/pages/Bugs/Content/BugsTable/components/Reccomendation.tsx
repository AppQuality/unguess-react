import { GlobalAlert, Anchor } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidSuggestionsApiResponse } from 'src/features/api';

export const Reccomendation = ({
  suggestion,
}: GetCampaignsByCidSuggestionsApiResponse) => (
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
      label:
        suggestion === 'banner_testing_automation'
          ? t('__BANNER_CROSS_FUNCTIONAL_CTA_AUTOMATION')
          : t('__BANNER_CROSS_FUNCTIONAL_CTA_EXPERIENCE'),
      onClick: () => {
        window.open(
          suggestion === 'banner_testing_automation'
            ? 'https://app.unguess.io/services/41'
            : 'https://app.unguess.io/services/22',
          '_blank'
        );
      },
    }}
    style={{ marginBottom: appTheme.space.lg }}
  />
);
