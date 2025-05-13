import { XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { WidgetLoader } from '../widgetLoader';
import { ReactComponent as WidgetImage } from './image.svg';

export const OnlyUniqueBugs = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString(),
  });

  return (
    <BasicWidget className="unique-bugs-widget">
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_ONLY_TOOLTIP')}
      >
        {t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_ONLY_HEADER')}
      </BasicWidget.Header>
      {isLoading ? (
        <WidgetLoader />
      ) : (
        <>
          <WidgetImage />
          <BasicWidget.Description
            header={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_REPORTED_BY')}
            content={
              <>
                {`${data?.items?.length || 0} `}
                <XL tag="span" isBold>
                  <Trans
                    i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_ONLY_COUNT_LABEL"
                    count={data?.items?.length || 0}
                  >
                    total bugs
                  </Trans>
                </XL>
              </>
            }
            footer={null}
          />
        </>
      )}

      <BasicWidget.Footer>Footer</BasicWidget.Footer>
    </BasicWidget>
  );
};
