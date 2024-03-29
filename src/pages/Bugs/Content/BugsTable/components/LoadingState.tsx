import { Skeleton } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import Table from 'src/common/components/Table';

export const LoadingState = () => (
  <div>
    <Skeleton height="20px" style={{ margin: `${appTheme.space.md} 0` }} />
    <Table
      style={{ marginBottom: appTheme.space.sm }}
      columns={[]}
      data={[]}
      isLoading
      loadingRowHeight="70px"
      loadingRowCount={3}
    />
  </div>
);
