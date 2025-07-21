import { GroupedTable, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { getStatusInfo } from 'src/common/components/utils/getStatusInfo';
import { CampaignStatus } from 'src/types';
import { CampaignAnchorTitle } from './CampaignAnchorTitle';
import { useCampaignsGroupedByProject } from './useCampaignsGroupedByProject';

export const TableList = () => {
  const { t } = useTranslation();

  const { campaigns, isLoading, isFetching, isError } =
    useCampaignsGroupedByProject();

  const columns = [
    { name: t('__CAMPAIGNS_TABLE_COLUMN_NAME'), field: 'name' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_CAMPAIGN_TYPE'), field: 'type' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_TEST_TYPE'), field: 'testType' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_START_DATE'), field: 'startDate' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_STATUS'), field: 'status' },
  ];

  if (!Object.keys(campaigns).length || isLoading || isFetching || isError)
    return null;

  const groupesCampaigns = campaigns.map(({ project, items }) => ({
    groupName: project.name,
    groupIcon: undefined as unknown as 'circle',
    items: items.map((campaign) => {
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
    }),
  }));

  return (
    <GroupedTable
      isReadOnly
      groups={groupesCampaigns}
      columns={columns}
      style={{
        backgroundColor: 'white',
        wordBreak: 'break-word',
        whiteSpace: 'normal',
      }}
    />
  );
};
