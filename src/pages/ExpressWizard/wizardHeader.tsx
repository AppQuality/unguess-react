import {
  Anchor,
  Breadcrumb,
  Logo,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

interface IBreadcrumb {
  name: string;
  onClick?: () => void;
}

export const WizardHeader = ({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs?: Array<IBreadcrumb>;
}) => {
  const { width } = useWindowSize();

  return width > parseInt(theme.breakpoints.sm, 10) ? (
    <Container>
      <Logo type="icon" size={25} style={{ marginRight: theme.space.xs }} />
      <Breadcrumb>
        {breadcrumbs &&
          breadcrumbs.length &&
          breadcrumbs.map((crumb) => (
            <Anchor {...(crumb.onClick && { onClick: crumb.onClick })}>
              {crumb.name}
            </Anchor>
          ))}
        <Span>{title}</Span>
      </Breadcrumb>
    </Container>
  ) : (
    <Span>{title}</Span>
  );
};
