import { Card } from '@appquality/unguess-design-system';
import { CardBackground } from './CardBackground';

interface ObservationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
}

export const ObservationCard = ({ quote }: ObservationCardProps) => (
  <Card>
    <blockquote>{quote}</blockquote>
  </Card>
);
