import {
  Logo,
  theme as globalTheme,
  Span,
  Label,
  InputToggle,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from 'src/assets/icons/error-icon.svg';
import { useState } from 'react';
import { WizardModel } from './wizardModel';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WizardHeader = (props: FormikProps<WizardModel>) => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { values, setFieldValue, getFieldProps, errors, validateForm } = props;
  const [key, setKey] = useState(new Date().getTime());
  const isDesktop = width > parseInt(globalTheme.breakpoints.sm, 10);
  const [showLabel, setShowLabel] = useState(false);

  return (
    <Container>
      {width > parseInt(globalTheme.breakpoints.sm, 10) ? (
        <Logo
          type="icon"
          size={25}
          style={{ marginRight: globalTheme.space.xs }}
        />
      ) : null}

      <TitleContainer>
        <InputToggle.Label style={{ opacity: showLabel ? 1 : 0 }}>
          Labellina
        </InputToggle.Label>
        <InputToggle isFocused>
          <InputToggle.Item
            size={isDesktop ? 22 : 16}
            placeholder={t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER')}
            {...getFieldProps('campaign_name')}
            validation={errors.campaign_name ? 'error' : undefined}
            onFocus={() => {
              setShowLabel(true);
            }}
            onBlur={() => {
              validateForm();
              setShowLabel(false);
            }}
          />
        </InputToggle>
      </TitleContainer>

      {/* <InputToggle
        name="campaign_name"
        placeholder={t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER')}
        style={{
          minWidth: isDesktop ? '25%' : '90%',
          marginLeft: theme.space.md,
        }}
        size={isDesktop ? 22 : 16}
        value={values.campaign_name || ''}
        onFocus={() => {
          console.log('onFocus');
        }}
        onChange={(e) => {
          setFieldValue('campaign_name', e.target.value);
        }}
        onBlur={() => {
          validateForm();
        }}
        isFocused
        {...(errors.campaign_name && {
          validation: 'error',
        })}
        {...(!isDesktop &&
          errors.campaign_name && {
            message: t(
              '__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED'
            ),
          })}
      /> */}
      {isDesktop && errors.campaign_name && (
        <>
          <ErrorIcon width={20} style={{ marginLeft: globalTheme.space.sm }} />
          <Span
            style={{
              color: globalTheme.colors.dangerHue,
              marginLeft: globalTheme.space.sm,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED')}
          </Span>
        </>
      )}
    </Container>
  );
};
