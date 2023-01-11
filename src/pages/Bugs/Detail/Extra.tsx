import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Bug } from 'src/features/api';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
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
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <MD isBold>Extra</MD>
    </Container>
  );
};
