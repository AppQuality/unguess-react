import { Track } from 'src/common/Track';
import { Container } from 'src/features/templates/Container';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  height: calc(100vh - ${(p) => p.theme.components.chrome.header.height});
  padding-top: ${(p) => p.theme.space.lg};
  padding-bottom: ${(p) => p.theme.space.lg};
  padding-left: ${(p) => p.theme.space.lg};
  padding-right: ${(p) => p.theme.space.lg};

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding-top: ${(p) => p.theme.space.xl};
    padding-bottom: ${(p) => p.theme.space.xl};
  }

  picture {
    min-height: 156px;
  }

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    picture {
      min-height: 480px;
    }
  }
  @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
    picture img {
      min-height: 650px;
    }
  }
`;

const PageWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <Track title={title}>
    <Container id="container" excludeMarginTop excludeMarginBottom>
      <Wrapper>{children}</Wrapper>
    </Container>
  </Track>
);

export default PageWrapper;
