import {
  Anchor,
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
import { StatusPill } from 'src/common/components/pills/StatusPill';
import { useTranslation } from 'react-i18next';
import { CampaignWithOutput } from 'src/features/api';
import { getCampaignStatus } from 'src/hooks/getCampaignStatus';
import { getLocalizeDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';

export const TableList = ({
  campaigns,
}: {
  campaigns: Array<CampaignWithOutput>;
}) => {
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
        return <StatusPill status="incoming" />;

      case 'COMPLETED':
        return <StatusPill status="completed" />;

      case 'PROGRESS':
        return <StatusPill status="running" />;
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
              <Anchor
                href={getLocalizeDashboardRoute({
                  campaignId: cp.id,
                  cpFamily: cp.family.name,
                  outputs: cp.outputs || [],
                })}
              >
                <Span isBold style={{ color: theme.palette.grey[800] }}>
                  {cp.customer_title ?? cp.title}
                </Span>
              </Anchor>
            </TableCell>
            <TableCell>{cp.family.name}</TableCell>
            <TableCell>{cp.type.name}</TableCell>
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
