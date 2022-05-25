import {
  Anchor,
  Counter,
  GroupedTable,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { getCampaignStatus } from 'src/hooks/getCampaignStatus';
import { getLocalizeRoute } from 'src/hooks/useLocalizeDashboardUrl';

export const TableList = ({
  campaigns,
}: {
  campaigns: Array<Array<Campaign>>;
}) => {
  const { t } = useTranslation();

  let columns = [
    { name: t('__CAMPAIGNS_TABLE_COLUMN_NAME'), field: 'name' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_CAMPAIGN_TYPE'), field: 'type' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_TEST_TYPE'), field: 'testType' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_START_DATE'), field: 'startDate' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_STATUS'), field: 'status' },
  ];

  //Colonne Nome Campagna, Tipologia, Tipo Test, StartDate, Status

  let groups: any = [];

  campaigns.forEach((campaignGroup) => {
    let projectName = campaignGroup[0].project_name;
    let campaigns: any = [];
    campaignGroup.forEach((campaign) => {
      // Get translated status label
      let translatedStatus = <></>;
      switch (getCampaignStatus(campaign)) {
        case 'INCOMING':
          translatedStatus = (
            <Counter status={'incoming'}>
              {t('__CAMPAIGNS_TABLE_COLUMN_STATUS_INCOMING')}
            </Counter>
          );
          break;
        case 'COMPLETED':
          translatedStatus = (
            <Counter status={'completed'}>
              {t('__CAMPAIGNS_TABLE_COLUMN_STATUS_COMPLETED')}
            </Counter>
          );
          break;
        case 'PROGRESS':
          translatedStatus = (
            <Counter status={'progress'}>
              {t('__CAMPAIGNS_TABLE_COLUMN_STATUS_PROGRESS')}
            </Counter>
          );
          break;
      }

      campaigns.push({
        name: (
          <Anchor
            href={getLocalizeRoute(campaign.id, campaign.campaign_family_name)}
          >
            <Span isBold style={{ color: theme.palette.grey[800] }}>
              {campaign.title}
            </Span>
          </Anchor>
        ),
        type: campaign.campaign_family_name,
        testType: campaign.campaign_type_name,
        startDate: new Date(campaign.start_date).toLocaleDateString(),
        status: translatedStatus,
      });
    });

    groups.push({
      groupName: projectName,
      items: campaigns,
    });
  });

  return (
    <GroupedTable
      groups={groups}
      columns={columns}
      style={{ backgroundColor: 'white' }}
    />
  );
};
