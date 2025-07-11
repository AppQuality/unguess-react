import {
  AccordionNew,
  Button,
  Col,
  FormField,
  Input,
  Label,
  Message,
  Row,
  Span,
} from '@appquality/unguess-design-system';

import { Field, FieldProps, useFormikContext } from 'formik';
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
          <div
            style={{
              marginTop: appTheme.space.base * 4,
              marginBottom: appTheme.space.md,
              marginLeft: '2px',
              marginRight: '2px',
            }}
          >
            <CurrentPassword />
          </div>
          <Row style={{ marginTop: appTheme.space.xs }}>
            <Col style={{ marginBottom: appTheme.space.xs }}>
              <NewPassword />
            </Col>
            <Col style={{ marginBottom: appTheme.space.xs }}>
              <ConfirmPassword />
            </Col>
          </Row>
          <div
            style={{
              marginTop: appTheme.space.xs,
            }}
          >
            <PasswordRequirements />
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
