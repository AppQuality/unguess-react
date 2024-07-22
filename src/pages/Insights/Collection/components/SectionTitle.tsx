import { MD, XXL } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';

const Style = styled.div`
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
    <XXL isBold>{title}</XXL>
    <MD>{subtitle}</MD>
  </Style>
);
