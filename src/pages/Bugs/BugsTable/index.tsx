import { MD, Accordion } from '@appquality/unguess-design-system';
import UsecaseTable from './UsecaseTable';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { columns, data, isLoading } = useTableData(campaignId);

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
          <UsecaseTable
            bugs={item.bugs}
            columns={columns}
            isLoading={isLoading}
          />
        </Accordion.Section>
      ))}
    </Accordion>
  );
};

export default BugsTable;
