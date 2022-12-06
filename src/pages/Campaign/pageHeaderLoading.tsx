import { PageHeader, Skeleton } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';

export const HeaderLoader = () => (
  <PageHeader>
    <PageHeader.Main infoTitle="My Campaign">
      <Skeleton
        width="30%"
        height="20px"
        style={{ marginBottom: theme.space.md }}
      />
      <Skeleton width="50%" height="40px" />
    </PageHeader.Main>
  </PageHeader>
);
