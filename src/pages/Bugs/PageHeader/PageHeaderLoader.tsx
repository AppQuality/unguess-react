import { Skeleton } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

const PageHeaderLoader = () => (
  <LayoutWrapper>
    <Skeleton height="150px" width="100%" style={{ borderRadius: 0 }} />
  </LayoutWrapper>
);

export default PageHeaderLoader;
