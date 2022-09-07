import { Logo, theme, InputToggle } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
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

  return (
    <Container>
      {width > parseInt(theme.breakpoints.sm, 10) ? (
        <Logo type="icon" size={25} style={{ marginRight: theme.space.xs }} />
      ) : null}
      <InputToggle
        name="campaign_name"
        placeholder={t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER')}
        style={{ minWidth: '20%', marginLeft: theme.space.md }}
        size={26}
        value={values.campaign_name || ''}
        onChange={(e) => {
          setFieldValue('campaign_name', e.target.value);
        }}
        {...(errors.campaign_name && {
          validation: 'error',
        })}
      />
    </Container>
  );
};
