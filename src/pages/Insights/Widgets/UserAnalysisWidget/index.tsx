import { Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

import { CapitalizeFirstLetter } from 'src/pages/Campaign/widgetCards/common/CapitalizeFirstLetter';
import { useUxTaggingVideoCompletionData } from '../hooks/useUxTaggingVideoCompletionData';

export const UserAnalysisWidget = ({ campaignId }: { campaignId: string }) => {
  const { countMediaWithObservation, countMedia } =
    useUxTaggingVideoCompletionData(campaignId);
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
              color: appTheme.palette.blue[600],
            }}
          >
            {countMediaWithObservation}
            <XL
              tag="span"
              isBold
              color={appTheme.palette.blue[600]}
              style={{ marginLeft: appTheme.space.xs }}
            >
              <Trans
                i18nKey="__CAMPAIGN_WIDGET_UX_USER_ANALYSIS_COUNT_LABEL"
                count={15}
              >
                videos with observations
              </Trans>
            </XL>
          </span>
        }
        footer={
          <Trans
            i18nKey="__CAMPAIGN_WIDGET_UX_USER_ANALYSIS_TOTAL_LABEL"
            defaults="on <bold>{{total}}</bold> total videos"
            count={countMedia}
            components={{
              bold: (
                <Span
                  isBold
                  style={{ color: appTheme.components.text.primaryColor }}
                />
              ),
            }}
            values={{
              total: countMedia,
            }}
          />
        }
      />
    </BasicWidget>
  );
};
