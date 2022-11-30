import { PieChart } from '@appquality/unguess-design-system';

const pieChartProps = {
  width: '100%',
  height: '270px',
  data: [
    {
      id: 'sass',
      label: 'sass',
      value: 309,
      color: 'hsl(162, 70%, 50%)',
    },
    {
      id: 'make',
      label: 'make',
      value: 420,
      color: 'hsl(175, 70%, 50%)',
    },
    {
      id: 'erlang',
      label: 'erlang',
      value: 300,
      color: 'hsl(159, 70%, 50%)',
    },
    {
      id: 'lisp',
      label: 'lisp',
      value: 491,
      color: 'hsl(243, 70%, 50%)',
    },
    {
      id: 'go',
      label: 'go',
      value: 108,
      color: 'hsl(163, 70%, 50%)',
    },
  ],
  centerItem: {
    label: 'Tot. bugs',
    value: '27',
  },
};
export const ChartUniqueBugs4UseCase = () => (
  <div>
    <PieChart {...pieChartProps} />
  </div>
);
