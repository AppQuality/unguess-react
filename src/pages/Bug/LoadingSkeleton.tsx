import { Page } from 'src/features/templates/Page';
import { Card, Skeleton } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

export const LoadingSkeleton = () => (
  <Page
    title={' '}
    pageHeader={
      <Skeleton height="150px" width="100%" style={{ borderRadius: 0 }} />
    }
    route="bug"
  >
    <LayoutWrapper isBoxed>
      <Card>
        <Skeleton
          height="50px"
          width="100%"
          style={{ borderRadius: 0, marginBottom: theme.space.xxl }}
        />
        <Skeleton height="400px" width="100%" style={{ borderRadius: 0 }} />
      </Card>
    </LayoutWrapper>
  </Page>
);
