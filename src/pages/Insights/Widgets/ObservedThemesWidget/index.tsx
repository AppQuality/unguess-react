import { Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

import { CapitalizeFirstLetter } from 'src/pages/Campaign/widgetCards/common/CapitalizeFirstLetter';

export const ObservedThemesWidget = () => {
  const { t } = useTranslation();
  return (
    <BasicWidget className="observed-themes-widget">
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_UX_OBSERVED_THEMES')}
      >
        <CapitalizeFirstLetter>
          {t('_CAMPAIGN_WIDGET_UX_OBSERVED_THEMES_HEADER')}
        </CapitalizeFirstLetter>
      </BasicWidget.Header>
      <BasicWidget.Description
        header=""
        content={
          <span
            style={{
              color: appTheme.colors.bySeverity.high,
            }}
          >
            14
            <XL tag="span" isBold color={appTheme.colors.bySeverity.high}>
              <Trans
                i18nKey="__CAMPAIGN_WIDGET_OBSERVED_THEMES_COUNT_LABEL"
                count={15}
              >
                {' titoli'}
              </Trans>
            </XL>
          </span>
        }
        footer={
          <Trans
            // TODO: change the translation key
            i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOTAL_LABEL_2"
            defaults="per un totale di <bold>{{total}}</bold> osservazioni"
            count={15}
            components={{
              bold: (
                <Span
                  isBold
                  style={{ color: appTheme.components.text.primaryColor }}
                />
              ),
            }}
            values={{
              total: 35,
            }}
          />
        }
      />
    </BasicWidget>
  );
};
