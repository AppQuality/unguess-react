import { useAppSelector } from 'src/app/hooks';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';

const BugsFilters = () => {
  const data = useAppSelector((state) => state.bugsPage);

  return (
    <>
      <TypeFilter />
      <SeverityFilter />
    </>
  );
};

export { BugsFilters };
