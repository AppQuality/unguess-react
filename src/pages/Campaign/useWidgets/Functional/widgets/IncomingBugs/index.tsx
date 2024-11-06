import { Anchor, SM, Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { DuplicateBugs } from './DuplicateBugs';
import { useBugsByDuplicates } from './DuplicateBugs/useBugsByDuplicates';
import { UnreadBugs } from './UnreadBugs';
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
    <BasicWidget className="incoming-bugs-widget" height={height}>
      <BasicWidget.Header
        tooltipContent={t('__CAMPAIGN_WIDGET_INCOMING_BUGS_TOOLTIP')}
      >
        {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_HEADER')}
      </BasicWidget.Header>
      {thereAreDuplicates ? (
        <Tabs>
          <Tabs.Panel
            id="tab-unread-bugs-incoming-bugs-widget"
            title={t('__CAMPAIGN_WIDGET_INCOMING_BUGS_UNREAD_TAB_TITLE')}
          >
            <UnreadBugsWrapper>
              <UnreadBugs campaignId={campaignId} />
            </UnreadBugsWrapper>
          </Tabs.Panel>
          <Tabs.Panel
            id="tab-most-submitted-bugs-incoming-bugs-widget"
            title={t(
              '__CAMPAIGN_WIDGET_INCOMING_BUGS_MOST_SUBMITTED_TAB_TITLE'
            )}
          >
            <DuplicateBugs campaignId={campaignId} />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <UnreadBugsWrapper style={{ marginTop: appTheme.space.md }}>
          <UnreadBugs campaignId={campaignId} />
        </UnreadBugsWrapper>
      )}
      <BasicWidget.Footer>
        <Anchor
          id="anchor-bugs-list-incoming-bugs-widget"
          isExternal
          onClick={() => {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            window.open(
              getLocalizedFunctionalDashboardUrl(campaignId, i18n.language),
              '_blank'
            );
          }}
        >
          <SM tag="span">
            {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_EXTERNAL_LINK_LABEL')}
          </SM>
        </Anchor>
      </BasicWidget.Footer>
    </BasicWidget>
  );
};

export default IncomingBugs;
