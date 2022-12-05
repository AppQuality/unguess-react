import { PieChart, Skeleton, theme } from '@appquality/unguess-design-system';
import { BugsByUseCaseVisualizationProps } from './types';
import { useBugsByUsecase } from './useBugsByUsecase';
import { useMaxItems } from './useMaxItems';

export const ChartUniqueBugs4UseCase = ({
  campaignId,
}: BugsByUseCaseVisualizationProps) => {
  const { items, total, isLoading, isError } = useBugsByUsecase(campaignId);
  const newItems = useMaxItems(items, 6);

  if (isLoading || isError) {
    return <Skeleton />;
  }
  return (
    <div style={{ marginBottom: theme.space.lg, width: '100%' }}>
      <PieChart
        legend={{
          width: '100%',
          columns: 2,
        }}
        width="100%"
        height="270px"
        centerItem={{ label: 'Tot. Bugs', value: total.toString() }}
        data={newItems}
        theme={{ labels: { text: { fontSize: 10 } } }}
      />
    </div>
  );
};
