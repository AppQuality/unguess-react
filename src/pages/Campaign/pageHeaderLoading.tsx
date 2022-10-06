import { PageHeader, Skeleton, theme } from '@appquality/unguess-design-system';

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
