import { Col, Row, Skeleton, XL } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const StyledRowContainer = styled(Row)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.space.xs};
`;
export const AiModalSkeleton = () => (
  <StyledRowContainer>
    <Col size={12}>
      <XL>
        <Skeleton isLight={false} width="60%" />
        <Skeleton isLight={false} />
        <Skeleton isLight={false} />
        <Skeleton isLight={false} width="40%" />
      </XL>
    </Col>
  </StyledRowContainer>
);
