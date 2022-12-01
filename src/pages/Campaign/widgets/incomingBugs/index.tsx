import { Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { UnreadBugs } from './UnreadBugs';
import { DuplicateBugs } from './DuplicateBugs';
import { BasicWidget } from '../widgetCards/BasicWidget';
import { useBugsByDuplicates } from './useBugsByDuplicates';

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
          <Tabs.List>
            <Tabs.Tab item="duplicate">
              {t('__CAMPAIGN_DUPLICATED_BUGS_TITLE', 'Most submitted')}
            </Tabs.Tab>
            <Tabs.Tab item="unread">
              {t('__CAMPAIGN_UNREAD_BUGS_TITLE', 'Unread')}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel item="duplicate">
            <DuplicateBugs data={duplicatesResponse} />
          </Tabs.Panel>
          <Tabs.Panel item="unread">
            <UnreadBugs />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <UnreadBugs />
      )}

      <BasicWidget.Footer>vai al dettaglio dei bug</BasicWidget.Footer>
    </BasicWidget>
  );
};

export default IncomingBugs;
