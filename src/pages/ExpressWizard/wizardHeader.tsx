import {
  Logo,
  Span,
  InputToggle,
  Anchor,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
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

  const isDesktop = width > parseInt(appTheme.breakpoints.sm, 10);

  useEffect(() => {}, []);

  return (
    <Container>
      {width > parseInt(appTheme.breakpoints.sm, 10) ? (
        <Logo
          type="icon"
          size={25}
          style={{ marginRight: appTheme.space.xs }}
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
            textSize={isDesktop ? 'xl' : 'lg'}
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
      {isDesktop && errors.campaign_name && (
        <>
          <ErrorIcon width={20} style={{ marginLeft: appTheme.space.sm }} />
          <Span
            style={{
              color: appTheme.colors.dangerHue,
              marginLeft: appTheme.space.sm,
            }}
          >
            {t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED')}
          </Span>
        </>
      )}
    </Container>
  );
};
