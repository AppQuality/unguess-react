import { PageHeader, Skeleton } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

export const HeaderLoader = () => (
  <LayoutWrapper>
    <PageHeader>
      <PageHeader.Main mainTitle="My Campaign">
        <Skeleton
          width="30%"
          height="20px"
          style={{ marginBottom: appTheme.space.md }}
        />
        <Skeleton width="50%" height="40px" />
      </PageHeader.Main>
    </PageHeader>
  </LayoutWrapper>
);
