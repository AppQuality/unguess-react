import {
  SM,
  Span,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { Bug } from 'src/features/api';
import { ReactComponent as FatherIcon } from 'src/assets/icons/father-icon.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Info = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => (
  <Container>
    {!bug.duplicated_of_id && (
      <FatherIcon
        style={{
          color: globalTheme.palette.grey[500],
          marginRight: globalTheme.space.xxs,
        }}
      />
    )}
    <Info>
      ID <Span isBold>{bug.id}</Span>
    </Info>
  </Container>
);
