import {
  Anchor,
  GroupedTable,
  Span,
  theme,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { CampaignWithOutput } from 'src/features/api';
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

  if (!campaigns.length) return null;

  // group campaigns by project
  const groupesCampaigns = campaigns.reduce(
    // acc must be any because the ds component has too strict types without any sense
    (acc: any[], curr: CampaignWithOutput[]) => {
      const projectName = curr[0].project.name;
      const groupExists = acc.find((group) => group.groupName === projectName);

      const items = curr.map((campaign) => {
        const statusInfo = getStatusInfo(
          campaign.status.name as CampaignStatus
        );
        return {
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
          status: (
            <Tooltip
              type="light"
              placement="auto"
              size="medium"
              content={statusInfo.text}
            >
              <span style={{ height: '1em' }}>{statusInfo.icon}</span>
            </Tooltip>
          ),
        };
      });

      if (groupExists) {
        groupExists.items = [...groupExists.items, ...items];
      } else {
        acc.push({
          groupName: projectName,
          items,
        });
      }
      return acc;
    },
    []
  );

  return (
    <GroupedTable
      isReadOnly
      groups={groupesCampaigns}
      columns={columns}
      style={{ backgroundColor: 'white' }}
    />
  );
};
