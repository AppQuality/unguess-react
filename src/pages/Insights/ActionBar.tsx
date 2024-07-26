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
  background-color: ${({ theme }) => theme.palette.blue[600]};
  color: white;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadii.xxl};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  transition: all 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ActionBar = () => {
  const { t } = useTranslation();
  const { values, setValues, resetForm } =
    useFormikContext<InsightFormValues>();
  const { isDrawerOpen, setIsDrawerOpen } = useInsightContext();

  // TODO: do not show action bar cta if in editing or creating mode
  const hideCta = (values.id > 0 || values.id === -1) && isDrawerOpen;

  if (values.observations.length === 0) return null;

  return (
    <FloatingContainer>
      <Container>
        <div style={{ marginRight: appTheme.space.md }}>
          <MD style={{ marginRight: appTheme.space.md }}>
            <Trans
              count={values.observations.length}
              i18nKey="__INSIGHTS_PAGE_ACTION_BAR_INSIGHTS_COUNT_LABEL"
            >
              Selected observations:
              <Span isBold>{{ count: values.observations.length }}</Span>
            </Trans>
          </MD>
        </div>
        <Button
          isLink
          size="small"
          onClick={() => {
            resetForm();
          }}
          style={{
            marginRight: appTheme.space.md,
            color: appTheme.palette.white,
          }}
        >
          {t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_CANCEL')}
        </Button>
        {!hideCta && (
          <Button
            isPrimary
            isAccent
            size="small"
            onClick={() => {
              setIsDrawerOpen(true);
              if (values.id === 0) {
                setValues({
                  ...values,
                  id: -1,
                });
              }
              if (values.id > 0) {
                setValues(values);
              }
            }}
          >
            {values.id === 0 || values.id === -1
              ? t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_CREATE_INSIGHT')
              : t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_EDIT_INSIGHT')}
          </Button>
        )}
      </Container>
    </FloatingContainer>
  );
};

export { ActionBar };
