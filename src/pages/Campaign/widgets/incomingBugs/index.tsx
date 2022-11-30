import { Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { UnreadBugs } from './UnreadBugs';
import { DuplicateBugs } from './DuplicateBugs';
import { BasicWidget } from '../widgetCards/BasicWidget';

const IncomingBugs = () => {
  const thereAreDuplicates = true;
  const { t } = useTranslation();

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
            <DuplicateBugs />
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
