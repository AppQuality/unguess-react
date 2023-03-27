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

  return (
    <Table isReadOnly style={{ backgroundColor: 'white' }}>
      <TableHead>
        <HeaderRow>
          {columns.map((column) => (
            <HeaderCell key={column.field}>{column.name}</HeaderCell>
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {campaigns.map((cp) => {
          const statusInfo = getStatusInfo(cp.status.name as CampaignStatus);
          return (
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
              <TableCell>
                <Tooltip
                  type="light"
                  placement="auto"
                  size="medium"
                  content={statusInfo.text}
                >
                  <span style={{ height: '1em' }}>{statusInfo.icon}</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
