import {
  AccordionNew,
  Button,
  ContainerCard,
} from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { styled } from 'styled-components';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { PasswordFormValues } from '../../valuesType';
import { CardInnerPanel, FieldExtraContent, StyledFooter } from '../common';
import ConfirmPassword from './ConfirmPassword';
import CurrentPassword from './CurrentPassword';
import NewPassword from './NewPassword';

const StyledAccordionSection = styled(AccordionNew.Section)`
  // workaround for the accordion panel overflow hidden that cuts off the input selected shadow
  #accordions.step_inner_panel {
    margin-left: -5px;
    margin-right: -5px;
  }
`;

const AccordionPanel = styled(CardInnerPanel)`
  container-type: inline-size;
  container-name: passwordSettings;
  // workaround for the accordion panel overflow hidden that cuts off the input selected shadow
  padding-left: 5px;
  padding-right: 5px;
`;

const AccordionHeader = styled(AccordionNew.Header)`
  padding: ${({ theme }) => theme.space.md};
`;

const NewPasswordContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'newPassword'
    'passwordRequirements'
    'confirmPassword';

  .newPassword {
    grid-area: newPassword;
  }
  .passwordRequirements {
    grid-area: passwordRequirements;
    margin-bottom: ${({ theme }) => theme.space.md};
  }
  .confirmPassword {
    grid-area: confirmPassword;
  }

  @container passwordSettings (min-width: 600px) {
    grid-template-columns: repeat(
      2,
      calc(50% - ${({ theme }) => theme.space.md})
    );
    grid-template-areas:
      'newPassword confirmPassword'
      'passwordRequirements passwordRequirements';
    column-gap: ${({ theme }) => theme.space.md};
    .passwordRequirements {
      margin-bottom: 0; // no margin at the bottom in this case
    }
  }
`;

export const PasswordAccordion = () => {
  const { t } = useTranslation();

  const {
    values: formValues,
    isSubmitting,
    submitForm,
  } = useFormikContext<PasswordFormValues>();

  const isOpen = false;

  return (
    <ContainerCard style={{ padding: 0 }}>
      <AccordionNew
        level={3}
        id="anchor-password-id"
        data-qa="password-accordion"
        key={`password_accordion_${isOpen}`}
        defaultExpandedSections={isOpen ? [0, 1] : []}
      >
        <StyledAccordionSection>
          <AccordionHeader
            icon={
              <KeyIcon
                style={{
                  width: appTheme.iconSizes.md,
                  height: appTheme.iconSizes.md,
                  color: appTheme.palette.blue[600],
                }}
              />
            }
          >
            <AccordionNew.Label
              style={{
                color: appTheme.palette.grey[800],
              }}
              label={t('__PROFILE_PAGE_PASSWORD_ACCORDION_LABEL')}
            />
          </AccordionHeader>
          <AccordionNew.Panel>
            <AccordionPanel>
              <CurrentPassword />
              <NewPasswordContainer>
                <div className="newPassword">
                  <NewPassword />
                </div>
                <div className="passwordRequirements">
                  <FieldExtraContent>
                    <PasswordRequirements password={formValues.newPassword} />
                  </FieldExtraContent>
                </div>
                <div className="confirmPassword">
                  <ConfirmPassword />
                </div>
              </NewPasswordContainer>
              <StyledFooter>
                <Button
                  isAccent
                  isPrimary
                  disabled={
                    isSubmitting ||
                    !formValues.currentPassword ||
                    !formValues.newPassword ||
                    !formValues.confirmPassword
                  }
                  onClick={submitForm}
                >
                  {t('__PAGE_PROFILE_SAVE_CHANGES_BUTTON')}
                </Button>
              </StyledFooter>
            </AccordionPanel>
          </AccordionNew.Panel>
        </StyledAccordionSection>
      </AccordionNew>
    </ContainerCard>
  );
};
