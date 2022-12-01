import { Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { UnreadBugs } from './UnreadBugs';
import { DuplicateBugs } from './DuplicateBugs';
import { BasicWidget } from '../widgetCards/BasicWidget';
import { useBugsByDuplicates } from './DuplicateBugs/useBugsByDuplicates';

const IncomingBugs = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const duplicatesResponse = useBugsByDuplicates(campaignId);
  const thereAreDuplicates = duplicatesResponse.bugs?.length > 0;

  return (
    <BasicWidget>
      <BasicWidget.Header tooltipContent="tooltip">
        incoming bugs
      </BasicWidget.Header>
      {thereAreDuplicates ? (
        <Tabs>
          <Tabs.Panel
            title={t('__CAMPAIGN_DUPLICATED_BUGS_TITLE', 'Most submitted')}
          >
            <DuplicateBugs campaignId={campaignId} />
          </Tabs.Panel>
          <Tabs.Panel title={t('__CAMPAIGN_UNREAD_BUGS_TITLE', 'Unread')}>
            <UnreadBugs campaignId={campaignId} />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <UnreadBugs campaignId={campaignId} />
      )}

      <BasicWidget.Footer>vai al dettaglio dei bug</BasicWidget.Footer>
    </BasicWidget>
  );
};

export default IncomingBugs;
