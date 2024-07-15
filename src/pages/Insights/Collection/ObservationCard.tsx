import { Card } from '@appquality/unguess-design-system';
import { CardBackground } from './CardBackground';

interface ObservationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  quote: string;
}

export const ObservationCard = ({ isOpen, quote }: ObservationCardProps) => (
  <CardBackground isOpen={isOpen}>
    <Card>
      <blockquote>{quote}</blockquote>
    </Card>
  </CardBackground>
);
