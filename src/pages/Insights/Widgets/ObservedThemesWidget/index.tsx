import { Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

import { CapitalizeFirstLetter } from 'src/pages/Campaign/widgetCards/common/CapitalizeFirstLetter';
import { useUxTotalTitleVsRecurrentTitles } from '../hooks/useUxTotalTitleVsRecurrentTitles';

export const ObservedThemesWidget = ({
  campaignId,
}: {
  campaignId: string;
}) => {
  const { t } = useTranslation();
  const { countRecurrentTitles, countTitleTag } =
    useUxTotalTitleVsRecurrentTitles(campaignId);
  return (
    <BasicWidget className="observed-themes-widget">
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_UX_OBSERVED_THEMES')}
      >
        <CapitalizeFirstLetter>
          {t('_CAMPAIGN_WIDGET_UX_OBSERVED_THEMES_HEADER')}
        </CapitalizeFirstLetter>
      </BasicWidget.Header>
      <div style={{ marginTop: appTheme.space.lg }}>
        <BasicWidget.Description
          header={t('_CAMPAIGN_WIDGET_UX_OBSERVED_THEMES_DESCRIPTION_HEADER')}
          content={
            <span
              style={{
                color: appTheme.palette.blue[600],
              }}
            >
              {countRecurrentTitles}
              <XL
                tag="span"
                isBold
                color={appTheme.palette.blue[600]}
                style={{ marginLeft: appTheme.space.xs }}
              >
                <Trans
                  i18nKey="__CAMPAIGN_WIDGET_UX_OBSERVED_THEMES_COUNT_LABEL"
                  count={countRecurrentTitles}
                >
                  themes
                </Trans>
              </XL>
            </span>
          }
          footer={
            <Trans
              // TODO: change the translation key
              i18nKey="__CAMPAIGN_WIDGET_UX_OBSERVED_THEMES_TOTAL_LABEL"
              defaults="out of <bold>{{total}}</bold> total observations"
              count={countTitleTag}
              components={{
                bold: (
                  <Span
                    isBold
                    style={{ color: appTheme.components.text.primaryColor }}
                  />
                ),
              }}
              values={{
                total: countTitleTag,
              }}
            />
          }
        />
      </div>
    </BasicWidget>
  );
};
