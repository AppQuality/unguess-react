export interface BugsByUseCaseVisualizationProps {
  campaignId: string;
}
interface PieDatum {
  [key: string]: string | number;
}

export interface WidgetItem extends PieDatum {
  id: string;
  label: string;
  value: number;
  key: number;
  children: string;
  numerator: number;
  denominator: number;
}
