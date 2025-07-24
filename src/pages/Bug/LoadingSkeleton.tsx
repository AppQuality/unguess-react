import { Skeleton } from '@appquality/unguess-design-system';
import { Page } from 'src/features/templates/Page';
import { LoadingSkeletonContent } from './LoadingSkeletonContent';

export const LoadingSkeleton = () => (
  <Page
    title={' '}
    pageHeader={
      <Skeleton height="150px" width="100%" style={{ borderRadius: 0 }} />
    }
    route="bug"
  >
    <LoadingSkeletonContent />
  </Page>
);
