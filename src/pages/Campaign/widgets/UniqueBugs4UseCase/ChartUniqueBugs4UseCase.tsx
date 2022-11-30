import { PieChart } from '@appquality/unguess-design-system';
import { PieDatum } from '@appquality/unguess-design-system/build/stories/charts/pie/_types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export const ChartUniqueBugs4UseCase = () => {
  const { campaignId } = useParams();
  const { data } = useGetCampaignsByCidWidgetsQuery({
    cid: Number(campaignId),
    s: 'bugs-by-usecase',
  });
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<PieDatum[]>([]);

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
  const pieChartProps = {
    width: '100%',
    height: '270px',
    data: items,
    centerItem: {
      label: 'Tot. bugs',
      value: String(total),
    },
  };
  return (
    <div>
      <PieChart {...pieChartProps} />
    </div>
  );
};
