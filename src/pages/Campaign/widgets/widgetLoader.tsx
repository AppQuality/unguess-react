import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';

interface LoaderProps {
  size?: 'sm' | 'md';
  align?: 'flex-start' | 'center';
}

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const ChartSkeleton = styled(Skeleton)<LoaderProps>`
  margin-bottom: ${({ theme }) => theme.space.sm};
  border-radius: 100%;
  margin-right: auto;
  width: ${({ size }) => (size && size === 'md' ? '150px' : '100px')};
  height: ${({ size }) => (size && size === 'md' ? '150px' : '100px')};
`;

const Group = styled.div`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Container = styled.div<LoaderProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'flex-start'};
  justify-content: ${({ align }) => align || 'flex-start'};
  width: 100%;
  margin-top: ${({ theme }) => theme.space.md};
`;

export const WidgetLoader = ({ size, align }: LoaderProps) => (
  <Container align={align}>
    <Group>
      <ChartSkeleton size={size} />
    </Group>
    <Group style={{ width: '100%' }}>
      <StyledSkeleton width="80%" height="22px" />
      <StyledSkeleton width="100%" height="32px" />
      <StyledSkeleton width="80%" height="24px" />
    </Group>
  </Container>
);
