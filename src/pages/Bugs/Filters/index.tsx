import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';

const BugsFilters = () => {
  const data = null;

  return (
    <>
      <SearchFilter />
      <UniqueFilter />
      <ReadFilter />
      <TypeFilter />
      <SeverityFilter />
    </>
  );
};

export { BugsFilters };
