import { LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { UserAnalysisWidget } from './Widgets/UserAnalysisWidget';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Widgets = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <UserAnalysisWidget />
    </Container>
  );
};

export { Widgets };
