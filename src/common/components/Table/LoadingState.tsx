import { Skeleton } from '@appquality/unguess-design-system';

export const LoadingState = ({
  colCount,
  rowHeight,
  rowCount = 10,
}: {
  colCount: number;
  rowHeight?: string;
  rowCount?: number;
}) => (
  <tbody>
    <tr>
      <td colSpan={colCount}>
        {[...Array(rowCount)].map(() => (
          <Skeleton
            height={rowHeight || '30px'}
            width="100%"
            style={{ borderRadius: 4, marginBottom: 0 }}
          />
        ))}
      </td>
    </tr>
  </tbody>
);
