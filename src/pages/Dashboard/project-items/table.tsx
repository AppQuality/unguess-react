import {
  Table,
  TableHead,
  HeaderRow,
  HeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { CampaignWithOutput } from 'src/features/api';
import { getStatusInfo } from 'src/common/components/utils/getStatusInfo';
import { CampaignStatus } from 'src/types';
import { ProjectAnchor } from './ProjectAnchor';

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

  if (!campaigns.length) return null;

  return (
    <Table
      isReadOnly
      style={{ backgroundColor: 'white' }}
      role="table"
      title="project-campaigns-table"
    >
      <TableHead>
        <HeaderRow role="row">
          {columns.map((column) => (
            <HeaderCell key={column.field}>{column.name}</HeaderCell>
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody role="rowgroup" title="project-campaigns-table-body">
        {campaigns.map((cp) => {
          const statusInfo = getStatusInfo(cp.status.name as CampaignStatus, t);
          const cpStartDate = new Date(cp.start_date).toLocaleDateString();

          return (
            <TableRow key={cp.id} role="row" title={cp.title}>
              <TableCell>
                <ProjectAnchor campaign={cp} />
              </TableCell>
              <TableCell>{cp.family.name}</TableCell>
              <TableCell>{cp.type.name}</TableCell>
              <TableCell>{cpStartDate}</TableCell>
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
