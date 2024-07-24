import { useFormikContext } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { Button, MD, Span } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { InsightFormValues } from './FormProvider';
import { useInsightContext } from './InsightContext';

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.levels.front};
  background-color: white;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  transition: all 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ActionBar = () => {
  const { t } = useTranslation();
  const { values, setValues } = useFormikContext<InsightFormValues>();
  const { setIsDrawerOpen } = useInsightContext();

  if (values.id !== 0) return null;
  if (values.observations.length === 0) return null;

  return (
    <FloatingContainer>
      <Container>
        <MD style={{ marginRight: appTheme.space.md }}>
          <Trans
            count={values.observations.length}
            i18nKey="__INSIGHTS_PAGE_ACTION_BAR_INSIGHTS_COUNT_LABEL"
          >
            <Span isBold style={{ color: appTheme.palette.blue[600] }}>
              {{ count: values.observations.length }}
            </Span>{' '}
            observations
          </Trans>
        </MD>
        <Button
          isPrimary
          size="small"
          onClick={() => {
            setIsDrawerOpen(true);
            setValues({ ...values, id: -1 });
          }}
        >
          {t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_CREATE_INSIGHT')}
        </Button>
      </Container>
    </FloatingContainer>
  );
};

export { ActionBar };
