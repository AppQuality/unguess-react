import { useTranslation } from 'react-i18next';
import { ListTotalBugsByType } from './ListTotalBugsByType';
import { BasicWidget } from '../widgetCards/BasicWidget';

const BugsByType = ({
  campaignId,
  height,
}: {
  campaignId: number;
  height?: string;
}) => {
  const { t } = useTranslation();

  return (
    <BasicWidget height={height}>
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_BUGS_BY_TYPE_TOOLTIP')}
      >
        {t('__CAMPAIGN_WIDGET_BUGS_BY_TYPE_HEADER')}
      </BasicWidget.Header>

      <ListTotalBugsByType campaignId={campaignId} />
    </BasicWidget>
  );
};

export default BugsByType;
