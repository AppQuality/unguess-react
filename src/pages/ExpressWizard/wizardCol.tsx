import { Col } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const WizardCol = styled(Col)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 0;
  }
`;

export { WizardCol };
