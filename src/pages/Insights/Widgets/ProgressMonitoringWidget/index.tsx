import { Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

import { CapitalizeFirstLetter } from 'src/pages/Campaign/widgetCards/common/CapitalizeFirstLetter';

export const ProgressMonitoringWidget = () => {
  const { t } = useTranslation();
  return (
    <BasicWidget className="observed-themes-widget">
      <BasicWidget.Header
        tooltipContent={t('_CAMPAIGN_WIDGET_UX_TEST_PROGRESS_MONITORING')}
      >
        <CapitalizeFirstLetter>
          {t('_CAMPAIGN_WIDGET_UX_TEST_PROGRESS_MONITORING_HEADER')}
        </CapitalizeFirstLetter>
      </BasicWidget.Header>
      <BasicWidget.Description
        header=""
        content={
          <span
            style={{
              color: appTheme.colors.bySeverity.critical,
            }}
          >
            25%
            <XL
              tag="span"
              isBold
              color={appTheme.colors.bySeverity.critical}
              style={{ marginLeft: appTheme.space.xs }}
            >
              Major issue
            </XL>
          </span>
        }
        footer={
          <Trans
            // TODO: change the translation key
            i18nKey="__CAMPAIGN_WIDGET_UX_OBSERVED_THEMES_TOTAL_LABEL"
            defaults="out of <bold>{{total}}</bold> total observations"
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
