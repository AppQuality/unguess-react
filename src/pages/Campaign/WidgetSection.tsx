import { Row } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from '../../common/components/SectionTitle';

const WidgetSection = styled(Row)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

const WidgetGrid = styled.div`
  margin-bottom: ${(p) => p.theme.space.xxl};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space.lg};

  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

interface WidgetSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const WidgetSectionNew = ({
  id,
  subtitle,
  title,
  children,
}: WidgetSectionProps) => (
  <section id={id}>
    <header style={{ marginBottom: appTheme.space.xl }}>
      <SectionTitle subtitle={subtitle} title={title} />
    </header>
    <WidgetGrid>{children}</WidgetGrid>
  </section>
);

export { WidgetSection, WidgetSectionNew };
