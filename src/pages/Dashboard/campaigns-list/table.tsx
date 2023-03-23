import {
  Anchor,
  GroupedTable,
  Span,
  theme,
  Tooltip,
} from '@appquality/unguess-design-system';
import { StatusTag } from 'src/common/components/tag/StatusTag';
import { useTranslation } from 'react-i18next';
import { CampaignWithOutput } from 'src/features/api';
import { getCampaignStatus } from 'src/hooks/getCampaignStatus';
import { getLocalizeDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { getStatusInfo } from 'src/common/components/utils/getStatusInfo';
import { CampaignStatus } from 'src/types';

export const TableList = ({
  campaigns,
}: {
  campaigns: Array<Array<CampaignWithOutput>>;
}) => {
  const { t } = useTranslation();

  const columns = [
    { name: t('__CAMPAIGNS_TABLE_COLUMN_NAME'), field: 'name' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_CAMPAIGN_TYPE'), field: 'type' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_TEST_TYPE'), field: 'testType' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_START_DATE'), field: 'startDate' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_STATUS'), field: 'status' },
  ];

  // Colonne Nome Campagna, Tipologia, Tipo Test, StartDate, Status

  const groups: any = [];

  campaigns.forEach((campaignGroup) => {
    const projectName = campaignGroup[0].project.name;
    const groupedCampaigns: any = [];
    campaignGroup.forEach((campaign) => {
      // Get translated status label
      let status = null;
      switch (getCampaignStatus(campaign)) {
        case 'INCOMING':
          status = (
            <Tooltip
              type="light"
              placement="auto"
              size="medium"
              content={getStatusInfo('incoming' as CampaignStatus).text}
            >
              <span style={{ height: '1em' }}>
                <StatusTag isRound status="incoming" />
              </span>
            </Tooltip>
          );
          break;
        case 'COMPLETED':
          status = (
            <Tooltip
              type="light"
              placement="auto"
              size="medium"
              content={getStatusInfo('completed' as CampaignStatus).text}
            >
              <span style={{ height: '1em' }}>
                <StatusTag isRound status="completed" />
              </span>
            </Tooltip>
          );
          break;
        case 'PROGRESS':
          status = (
            <Tooltip
              type="light"
              placement="auto"
              size="medium"
              content={getStatusInfo('running' as CampaignStatus).text}
            >
              <span style={{ height: '1em' }}>
                <StatusTag isRound status="running" />
              </span>
            </Tooltip>
          );
          break;
        default:
          status = null;
      }

      groupedCampaigns.push({
        name: (
          <Anchor
            href={getLocalizeDashboardRoute({
              campaignId: campaign.id,
              cpFamily: campaign.family.name,
              outputs: campaign.outputs || [],
            })}
          >
            <Span isBold style={{ color: theme.palette.grey[800] }}>
              {campaign.customer_title ?? campaign.title}
            </Span>
          </Anchor>
        ),
        type: campaign.family.name,
        testType: campaign.type.name,
        startDate: new Date(campaign.start_date).toLocaleDateString(),
        status,
      });
    });

    groups.push({
      groupName: projectName,
      items: groupedCampaigns,
    });
  });

  return (
    <GroupedTable
      isReadOnly
      groups={groups}
      columns={columns}
      style={{ backgroundColor: 'white' }}
    />
  );
};
