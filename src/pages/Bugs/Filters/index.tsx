import { theme } from 'src/app/theme';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';

const BugsFilters = () => (
  <div style={{ display: 'flex', gap: `${theme.space.base * 4}px` }}>
    <SearchFilter />
    <UniqueFilter />
    <ReadFilter />
    <SeverityFilter />
    <TypeFilter />
  </div>
);

export { BugsFilters };
