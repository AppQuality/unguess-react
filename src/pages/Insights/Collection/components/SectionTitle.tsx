import { MD, XXL } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { GroupByToggle } from './GroupByToggle';

const Style = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.space.md};
  padding-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.xs};
  ${XXL} {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
  ${MD} {
    padding-bottom: ${({ theme }) => theme.space.xxs};
  }
`;

export const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <Style>
    <div>
      <XXL isBold>{title}</XXL>
      <MD>{subtitle}</MD>
    </div>
    <GroupByToggle />
  </Style>
);
