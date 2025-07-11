import {
  AccordionNew,
  Button,
  Col,
  Row,
} from '@appquality/unguess-design-system';

import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { styled } from 'styled-components';

import { PasswordRequirements } from '../../PasswordRequirements';
import { PasswordFormValues } from '../../valuesType';
import { StyledFooter } from '../common';
import ConfirmPassword from './ConfirmPassword';
import CurrentPassword from './CurrentPassword';
import NewPassword from './NewPassword';

const StyledAccordionSection = styled(AccordionNew.Section)`
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;

export const PasswordAccordion = () => {
  const { t } = useTranslation();

  const {
    values: formValues,
    isSubmitting,
    submitForm,
  } = useFormikContext<PasswordFormValues>();

  const isOpen = false; // Temporary, as the context is not fully implemented yet

  return (
    <AccordionNew
      level={3}
      id="anchor-password-id"
      data-qa="password-accordion"
      key={`password_accordion_${isOpen}`}
      hasBorder
      defaultExpandedSections={isOpen ? [0, 1] : []}
    >
      <StyledAccordionSection>
        <AccordionNew.Header
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
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <div style={{ padding: '0px 2px' }}>
            <Row>
              <Col xs={12}>
                <CurrentPassword />
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <NewPassword />
                  </Col>
                  <Col xs={12}>
                    <PasswordRequirements />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <ConfirmPassword />
              </Col>
            </Row>
          </div>
          <StyledFooter style={{ marginTop: appTheme.space.sm }}>
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
              Save changes
            </Button>
          </StyledFooter>
        </AccordionNew.Panel>
      </StyledAccordionSection>
    </AccordionNew>
  );
};
