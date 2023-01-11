import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';

const BugsTable = () => {
  const filterBy = getSelectedFiltersIds();
  const { isLoading, data } = useGetCampaignsByCidBugsQuery({
    cid: '4871',
    filterBy: {
      ...(filterBy?.types ? { types: filterBy.types.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
    },
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {JSON.stringify(filterBy)}
      <br />
      <ul>
        {data?.items?.map((item) => (
          <li key={item.id}>
            {`${item.internal_id} - ${item.title.full}`}
            <b>{item.type.name}</b> - <b>{item.severity.name}</b>
          </li>
        ))}
      </ul>
    </>
  );
};

export { BugsTable };
