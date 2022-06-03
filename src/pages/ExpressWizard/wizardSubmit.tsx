import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ReactComponent as RocketIcon } from 'src/assets/icons/rocket-icon.svg';
import { Spinner, theme } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { WaterButton } from '../../common/components/waterButton';
import { WizardModel } from './wizardModel';

const StyledDiv = styled.div`
  /** Horizontal Align */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WizardSubmit = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { errors, isSubmitting, handleSubmit } = props;

  return (
    <StyledDiv>
      <WaterButton
        isPill
        isPrimary
        type="submit"
        disabled={Object.keys(errors).length > 0 || isSubmitting}
        onClick={() => handleSubmit()}
      >
        <WaterButton.StartIcon>
          <RocketIcon />
        </WaterButton.StartIcon>
        {t('__EXPRESS_WIZARD_CONFIRM_BUTTON_LABEL')}
      </WaterButton>
      {isSubmitting && (
        <Spinner
          size="24"
          color={theme.palette.blue[600]}
          style={{ marginLeft: theme.space.sm }}
        />
      )}
    </StyledDiv>
  );
};
