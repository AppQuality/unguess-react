import { MD, Accordion } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { EmptyState } from './EmptyState';
import { mapBugsToTableData } from './mapBugsToTableData';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { columns, data, isLoading } = useTableData(campaignId);
  const dispatch = useAppDispatch();
  const currentBugId = getSelectedBugId();
  const { t } = useTranslation();

  // seems that sections index are only odd numbers ¯\_(ツ)_/¯
  // i.e. [1, 3, 5, 7]
  const defaultExpandedSections = Array.from(
    data.bugsByUseCases,
    (_, i) => i + (i + 1)
  );
  if (isLoading) return '';
  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {data.bugsByUseCases.map((item) => (
        <Accordion.Section key={item.useCase.id}>
          <Accordion.Header>
            <Accordion.Label style={{ padding: 0 }}>
              <MD isBold>{item.useCase.title}</MD>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {item.bugs && item.bugs.length > 0 && (
              <Table
                columns={columns}
                data={mapBugsToTableData(item.bugs, t)}
                selectedRow={currentBugId ? currentBugId.toString() : null}
                onRowClick={(bug_id) => dispatch(selectBug({ bug_id }))}
                isSticky
                isLoading={isLoading}
                loadingRowHeight="70px"
                emptyState={<EmptyState />}
              />
            )}
          </Accordion.Panel>
        </Accordion.Section>
      ))}
    </Accordion>
  );
};

export default BugsTable;
