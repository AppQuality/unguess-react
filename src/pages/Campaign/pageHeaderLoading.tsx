import { PageHeader, Skeleton } from '@appquality/unguess-design-system';

export const HeaderLoader = () => (
  <PageHeader>
    <PageHeader.Main infoTitle="My Campaign">
      <Skeleton width="80%" height="34px" />
      <Skeleton width="60%" height="18px" />
    </PageHeader.Main>
  </PageHeader>
);
