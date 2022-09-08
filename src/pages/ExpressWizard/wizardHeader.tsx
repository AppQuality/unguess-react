import {
  Logo,
  theme,
  InputToggle,
  Span,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from 'src/assets/icons/error-icon.svg';
import { WizardModel } from './wizardModel';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const WizardHeader = (props: FormikProps<WizardModel>) => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { values, setFieldValue, errors } = props;

  const isDesktop = width > parseInt(theme.breakpoints.sm, 10);

  return (
    <Container>
      {width > parseInt(theme.breakpoints.sm, 10) ? (
        <Logo type="icon" size={25} style={{ marginRight: theme.space.xs }} />
      ) : null}
      <InputToggle
        name="campaign_name"
        placeholder={t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER')}
        style={{
          minWidth: isDesktop ? '25%' : '90%',
          marginLeft: theme.space.md,
        }}
        size={isDesktop ? 22 : 16}
        value={values.campaign_name || ''}
        onChange={(e) => {
          setFieldValue('campaign_name', e.target.value);
        }}
        {...(errors.campaign_name && {
          validation: 'error',
        })}
        {...(!isDesktop &&
          errors.campaign_name && {
            message: t(
              '__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED'
            ),
          })}
      />
      {isDesktop && errors.campaign_name && (
        <>
          <ErrorIcon width={20} style={{ marginLeft: theme.space.sm }} />
          <Span
            style={{
              color: theme.colors.dangerHue,
              marginLeft: theme.space.sm,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED')}
          </Span>
        </>
      )}
    </Container>
  );
};
