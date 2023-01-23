import { Accordion, Skeleton } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import UsecaseTable from './UsecaseTable';

const loadingTables = [1, 3];
export const LoadingState = () => (
  <Accordion
    level={3}
    defaultExpandedSections={loadingTables}
    isExpandable
    isBare
  >
    {loadingTables.map((item) => (
      <Accordion.Section key={item}>
        <Accordion.Header>
          <Accordion.Label>
            <Skeleton height="20px" style={{ marginBottom: theme.space.md }} />
          </Accordion.Label>
        </Accordion.Header>
        <UsecaseTable isLoading bugs={[]} columns={[]} />
      </Accordion.Section>
    ))}
  </Accordion>
);
