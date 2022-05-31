import {
  Anchor,
  Counter,
  Span,
  Table,
  TableHead,
  HeaderRow,
  HeaderCell,
  TableBody,
  TableRow,
  TableCell,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { getCampaignStatus } from 'src/hooks/getCampaignStatus';
import { getLocalizeRoute } from 'src/hooks/useLocalizeDashboardUrl';

export const TableList = ({ campaigns }: { campaigns: Array<Campaign> }) => {
  const { t } = useTranslation();

  const columns = [
    { name: t('__CAMPAIGNS_TABLE_COLUMN_NAME'), field: 'name' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_CAMPAIGN_TYPE'), field: 'type' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_TEST_TYPE'), field: 'testType' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_START_DATE'), field: 'startDate' },
    { name: t('__CAMPAIGNS_TABLE_COLUMN_STATUS'), field: 'status' },
  ];

  const campaignStatus = (status?: string) => {
    if (!status) return null;

    switch (status) {
      case 'INCOMING':
        return (
          <Counter status="incoming">
            {t('__CAMPAIGNS_TABLE_COLUMN_STATUS_INCOMING')}
          </Counter>
        );

      case 'COMPLETED':
        return (
          <Counter status="completed">
            {t('__CAMPAIGNS_TABLE_COLUMN_STATUS_COMPLETED')}
          </Counter>
        );

      case 'PROGRESS':
        return (
          <Counter status="progress">
            {t('__CAMPAIGNS_TABLE_COLUMN_STATUS_PROGRESS')}
          </Counter>
        );
      default:
        return null;
    }
  };

  return (
    <Table style={{ backgroundColor: 'white' }}>
      <TableHead>
        <HeaderRow>
          {columns.map((column) => (
            <HeaderCell key={column.field}>{column.name}</HeaderCell>
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {campaigns.map((cp) => (
          <TableRow key={cp.id}>
            <TableCell>
              <Anchor href={getLocalizeRoute(cp.id, cp.campaign_family_name)}>
                <Span isBold style={{ color: theme.palette.grey[800] }}>
                  {cp.title}
                </Span>
              </Anchor>
            </TableCell>
            <TableCell>{cp.campaign_family_name}</TableCell>
            <TableCell>{cp.campaign_type_name}</TableCell>
            <TableCell>
              {new Date(cp.start_date).toLocaleDateString()}
            </TableCell>
            <TableCell>{campaignStatus(getCampaignStatus(cp))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
