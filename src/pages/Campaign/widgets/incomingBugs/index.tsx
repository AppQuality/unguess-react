import { Anchor, Tabs, theme } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import { UnreadBugs } from './UnreadBugs';
import { DuplicateBugs } from './DuplicateBugs';
import { BasicWidget } from '../widgetCards/BasicWidget';
import { useBugsByDuplicates } from './DuplicateBugs/useBugsByDuplicates';
import { UnreadBugsWrapper } from './UnreadBugs/UnreadBugsWrapper';

const IncomingBugs = ({
  campaignId,
  height,
}: {
  campaignId: number;
  height?: string;
}) => {
  const { t } = useTranslation();
  const duplicatesResponse = useBugsByDuplicates(campaignId);
  const thereAreDuplicates = duplicatesResponse.bugs?.length > 0;

  return (
    <BasicWidget height={height}>
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_INCOMING_BUGS_TOOLTIP')}
      >
        {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_HEADER')}
      </BasicWidget.Header>
      {thereAreDuplicates ? (
        <Tabs>
          <Tabs.Panel
            title={t(
              '__CAMPAIGN_WIDGET_INCOMING_BUGS_MOST_SUBMITTED_TAB_TITLE'
            )}
          >
            <DuplicateBugs campaignId={campaignId} />
          </Tabs.Panel>
          <Tabs.Panel
            title={t('__CAMPAIGN_WIDGET_INCOMING_BUGS_UNREAD_TAB_TITLE')}
          >
            <UnreadBugs campaignId={campaignId} />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <UnreadBugsWrapper marginTop={theme.space.md}>
          <UnreadBugs campaignId={campaignId} />
        </UnreadBugsWrapper>
      )}
      <BasicWidget.Footer>
        <Anchor
          isExternal
          onClick={() => {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            window.open(
              getLocalizedFunctionalDashboardUrl(campaignId, i18n.language),
              '_blank'
            );
          }}
        >
          {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_EXTERNAL_LINK_LABEL')}
        </Anchor>
      </BasicWidget.Footer>
    </BasicWidget>
  );
};

export default IncomingBugs;
