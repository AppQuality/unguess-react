import { useAppSelector } from 'src/app/hooks';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';

const BugsFilters = () => {
  const data = useAppSelector((state) => state.bugsPage);

  return (
    <>
      {JSON.stringify(data)}
      <UniqueFilter />
      <ReadFilter />
      <TypeFilter />
      <SeverityFilter />
    </>
  );
};

export { BugsFilters };
