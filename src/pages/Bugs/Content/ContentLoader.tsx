import { Skeleton } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

const BugsPageContentLoader = () => (
  <LayoutWrapper isNotBoxed>
    <Skeleton
      height="50px"
      width="100%"
      style={{ borderRadius: 0, marginBottom: appTheme.space.xxl }}
    />
    <Skeleton height="400px" width="100%" style={{ borderRadius: 0 }} />
  </LayoutWrapper>
);

export default BugsPageContentLoader;
