import { XL, LG } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';

const InstructionsWrapper = styled.div`
  margin-bottom: ${appTheme.space.xl};
`;

const Description = styled(LG)`
  color: ${appTheme.palette.grey[600]};
  margin-bottom: ${appTheme.space.lg};
`;

export const Instructions = () => (
  <InstructionsWrapper>
    <XL tag="h2" isBold>
      Activity instructions
    </XL>
    <Description>
      In this section, you can set up the manual to guide testers during the
      activity.
    </Description>
  </InstructionsWrapper>
);
