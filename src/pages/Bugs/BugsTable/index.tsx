import { MD, Accordion } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import UsecaseTable from './UsecaseTable';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { columns, data, isLoading } = useTableData(campaignId);
  const { t } = useTranslation();
  // seems that sections index are only odd numbers ¯\_(ツ)_/¯
  // i.e. [1, 3, 5, 7]
  const defaultExpandedSections = Array.from(
    data.bugsByUseCases,
    (_, i) => i + (i + 1)
  );
  if (isLoading) return null;
  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {data.bugsByUseCases.map((item) => {
        const unread = item.bugs.filter((bug) => !bug.read).length;
        return (
          <Accordion.Section key={item.useCase.id}>
            <Accordion.Header>
              <Accordion.Label>
                <MD isBold>{item.useCase.title}</MD>
              </Accordion.Label>
              <div style={{ flex: '0 0 auto' }}>
                {t('__BUGS_PAGE_ACCORDION_LABEL_UNREAD_FRACTION', {
                  count: unread,
                  defaultValue: 'unread',
                })}{' '}
                ({unread}/{item.bugs.length})
              </div>
            </Accordion.Header>
            <UsecaseTable
              bugs={item.bugs}
              columns={columns}
              isLoading={isLoading}
            />
          </Accordion.Section>
        );
      })}
    </Accordion>
  );
};

export default BugsTable;
