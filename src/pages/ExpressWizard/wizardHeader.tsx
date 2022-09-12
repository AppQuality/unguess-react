import {
  Logo,
  theme as globalTheme,
  Span,
  InputToggle,
  Anchor,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from 'src/assets/icons/error-icon.svg';
import { useAppSelector } from 'src/app/hooks';
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

const StyledAnchor = styled(Anchor)`
  padding: 0 ${({ theme }) => theme.space.xxs};
`;

interface WizardHeaderProps extends FormikProps<WizardModel> {
  onClose: () => void;
}

export const WizardHeader = ({ onClose, ...props }: WizardHeaderProps) => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { getFieldProps, errors, validateForm } = props;
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const isDesktop = width > parseInt(globalTheme.breakpoints.sm, 10);

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
        <StyledAnchor onClick={() => onClose()}>
          {activeWorkspace
            ? `${activeWorkspace.company}'s Workspace`
            : 'Workspace'}
        </StyledAnchor>
        <InputToggle isFocused>
          <InputToggle.Item
            size={isDesktop ? 22 : 16}
            placeholder={t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER')}
            {...getFieldProps('campaign_name')}
            validation={errors.campaign_name ? 'error' : undefined}
            onBlur={() => {
              validateForm();
            }}
            style={{ paddingTop: 0 }}
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
