import { LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Widgets = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <LG>{t('__INSIGHTS_PAGE_WIDGETS_TITLE')}</LG>
    </Container>
  );
};

export { Widgets };
