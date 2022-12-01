import { PieChart, Skeleton } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

interface PieItem {
  [key: string]: string | number;
}

export const ChartUniqueBugs4UseCase = () => {
  const { campaignId } = useParams();
  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: Number(campaignId),
      s: 'bugs-by-usecase',
    });
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<PieItem[]>([]);

  useEffect(() => {
    if (data && 'kind' in data && data.kind === 'bugsByUseCase') {
      const newTotal = data.data.reduce(
        (acc, current) => acc + current.bugs,
        0
      );
      const currentItems = data.data.map((item) => ({
        id: item.title,
        label: 'label test',
        value: item.bugs,
      }));
      setItems(currentItems);
      setTotal(newTotal);
    }
  }, [data]);

  if (isFetching || isLoading || isError) {
    return <Skeleton />;
  }
  return (
    <PieChart
      width="100%"
      height="270px"
      centerItem={{ label: 'Tot. Bugs', value: total.toString() }}
      data={items}
    />
  );
};
