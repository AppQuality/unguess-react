import { Skeleton } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';

const BugsPageContentLoader = () => (
  <>
    <Skeleton
      height="50px"
      width="100%"
      style={{ borderRadius: 0, marginBottom: globalTheme.space.xxl }}
    />
    <Skeleton height="400px" width="100%" style={{ borderRadius: 0 }} />
  </>
);

export default BugsPageContentLoader;
