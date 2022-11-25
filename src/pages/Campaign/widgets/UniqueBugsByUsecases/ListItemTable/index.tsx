import { Skeleton } from '@appquality/unguess-design-system';
import { useUniqueBugsByUsecases } from '../useUniqueBugsByUsecases';
import { ListItem } from './ListItem';

export const ListItemTable = ({ campaignId }: { campaignId: number }) => {
  const { /* bugs, uniqueBugs, */ isLoading } =
    useUniqueBugsByUsecases(campaignId);
  const items = [
    {
      usecase: 'UC 2. Navigazione sito',
      unique: 36,
      total: 100,
    },
    { usecase: 'UC 1. Homepage', unique: 87, total: 100 },
    { usecase: 'UC 4. Check-out', unique: 33, total: 100 },
    { usecase: 'UC 3. Pagina prodotto', unique: 69, total: 100 },
    { usecase: 'UC 5. Lista prodotti', unique: 56, total: 137 },
    { usecase: 'UC 6. Pagina prodotto2', unique: 37, total: 600 },
  ];

  if (isLoading) return <Skeleton />;
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'space-between',
        flexDirection: 'column',
        pointerEvents: 'none',
      }}
    >
      {items.map((item) => (
        <ListItem item={item} />
      ))}
    </div>
  );
};
