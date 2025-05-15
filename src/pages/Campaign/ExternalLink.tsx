import { Anchor } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const StyledAnchor = styled(Anchor)`
  display: block;
`;

export const ExternalLink = ({
  id,
  url,
  children,
}: {
  id: string;
  url: string;
  children: React.ReactNode;
}) => (
  <StyledAnchor
    id={id}
    isExternal
    onClick={() => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      window.open(url, '_blank');
    }}
  >
    {children}
  </StyledAnchor>
);
