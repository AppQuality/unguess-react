import { Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

import { CapitalizeFirstLetter } from 'src/pages/Campaign/widgetCards/common/CapitalizeFirstLetter';

export const UserAnalysisWidget = () => {
  const { t } = useTranslation();
  return (
    <BasicWidget className="bugs-distribution-widget">
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_UX_USER_ANALYSIS')}
      >
        <CapitalizeFirstLetter>
          {t('_CAMPAIGN_WIDGET_UX_USER_ANALYSIS_HEADER')}
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
            7
            <XL tag="span" isBold color={appTheme.colors.bySeverity.critical}>
              <Trans
                i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_COUNT_LABEL"
                count={15}
              >
                video con osservazioni
              </Trans>
            </XL>
          </span>
        }
        footer={
          <Trans
            i18nKey="__CAMPAIGN_WIDGET_BUGDISTRIBUTION_TOTAL_LABEL"
            defaults="su <bold>{{total}}</bold> video totali"
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
