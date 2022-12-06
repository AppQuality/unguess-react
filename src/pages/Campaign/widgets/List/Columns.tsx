import styled from 'styled-components';
import { SM } from '@appquality/unguess-design-system';

const Label = styled(SM)``;

const ColumnsComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.md};

  ${Label} {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const Columns = ColumnsComponent as typeof ColumnsComponent & {
  Label: typeof Label;
};

Columns.Label = Label;

export { Columns };
