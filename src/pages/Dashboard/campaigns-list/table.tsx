import { GroupedTable, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { CampaignWithOutput } from 'src/features/api';
import { getStatusInfo } from 'src/common/components/utils/getStatusInfo';
import { CampaignStatus } from 'src/types';
import { CampaignAnchorTitle } from './CampaignAnchorTitle';

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
          campaign.status.name as CampaignStatus,
          t
        );

        const cpStartDate = new Date(campaign.start_date).toLocaleDateString();

        return {
          name: <CampaignAnchorTitle campaign={campaign} />,
          type: campaign.family.name,
          testType: campaign.type.name,
          startDate: cpStartDate,
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
