import { useAppSelector } from 'src/app/hooks';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';

const BugsFilters = () => {
  const data = useAppSelector((state) => state.bugsPage);

  return (
    <>
      <ReadFilter />
      <TypeFilter />
      <SeverityFilter />
    </>
  );
};

export { BugsFilters };
