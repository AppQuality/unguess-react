import { PageHeader } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${(p) => p.theme.space.xs} 0;
`;

export const PageHeaderTitle = ({ title }: { title: string }) => (
  <TitleWrapper>
    <PageHeader.Title>{title}</PageHeader.Title>
  </TitleWrapper>
);
