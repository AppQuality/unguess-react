import { PieChart, Skeleton } from '@appquality/unguess-design-system';
import { BugsByUseCaseVisualizationProps } from './types';
import { useBugsByUsecase } from './useBugsByUsecase';

export const ChartUniqueBugs4UseCase = ({
  campaignId,
}: BugsByUseCaseVisualizationProps) => {
  const { items, total, isLoading, isError } = useBugsByUsecase(campaignId);
  if (isLoading || isError) {
    return <Skeleton />;
  }
  return (
    <PieChart
      legend
      width="100%"
      height="270px"
      centerItem={{ label: 'Tot. Bugs', value: total.toString() }}
      data={items}
    />
  );
};
