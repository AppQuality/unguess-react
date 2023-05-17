import { PageHeader, Skeleton } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

export const HeaderSkeleton = () => (
  <PageHeader>
    <PageHeader.Main mainTitle="My Campaign">
      <Skeleton
        width="60%"
        height="20px"
        style={{ marginBottom: appTheme.space.lg }}
      />
      <Skeleton width="80%" height="40px" />
    </PageHeader.Main>
  </PageHeader>
);
