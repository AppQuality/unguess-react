import {
  ContainerCard,
  Paragraph,
  Skeleton,
} from '@appquality/unguess-design-system';

export const HowLoading = () => (
  <ContainerCard>
    <Paragraph>
      <Skeleton width="100%" height="24px" />
    </Paragraph>
    <Paragraph>
      <Skeleton width="80%" height="16px" />
      <Skeleton width="80%" height="16px" />
      <Skeleton width="80%" height="16px" />
      <Skeleton width="60%" height="16px" />
    </Paragraph>
  </ContainerCard>
);
