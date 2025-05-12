import { useParams } from 'react-router-dom';
import FlipCard from 'src/pages/Campaign/widgetCards/FlipCard';
import { Chart } from './Chart';
import { List } from './List';

const UniqueBugsByAdditional = ({
  name,
  height,
}: {
  name: string;
  height: string;
}) => {
  const { campaignId } = useParams();
  if (!campaignId) {
    return null;
  }
  return (
    <FlipCard className="flip-card-unique-bugs-by-additionals" height={height}>
      <FlipCard.Header>{name}</FlipCard.Header>
      <FlipCard.Body
        front={<Chart slug={name} campaignId={campaignId} />}
        back={<List slug={name} campaignId={campaignId} />}
      />
    </FlipCard>
  );
};

export default UniqueBugsByAdditional;
