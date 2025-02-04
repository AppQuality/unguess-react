import {
  ContainerCard,
  Grid,
  Label,
  Paragraph,
  Row,
  Span,
  Textarea,
  XXL,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useEffect } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as NotAllowedIcon } from 'src/assets/icons/not-allowed-icon.svg';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';
import * as Yup from 'yup';
import { WhatConfirm } from './confirm/whatConfirm';
import { WhereConfirm } from './confirm/whereConfirm';
import { WhoConfirm } from './confirm/whoConfirm';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;

  span {
    ${(props) => retrieveComponentStyles('text.primary', props)};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledCard = styled(ContainerCard)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.space.base}px;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: ${({ theme }) => theme.space.base * 2}px;
`;

const TextareaNote = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.2;

  svg {
    margin-bottom: -${({ theme }) => theme.space.base / 2}px;
    margin-right: ${({ theme }) => theme.space.base}px;
  }
`;

export const ConfirmationStep = (props: FormikProps<WizardModel>) => {
  const { values, getFieldProps, setFieldValue } = props;

  const hasWhereStep = values.link || values.iOSLink || values.androidLink;
  const hasWhoStep = values.campaign_language;

  useEffect(() => {
    // Tryber campaign configuration specific for this XPS campaign
    setFieldValue('has_bug_form', true);
  }, []);

  return (
    <ContainerCard>
      <StepTitle>
        <Span isBold>{t('__EXPRESS_WIZARD_STEP_RECAP_TITLE')}</Span>
      </StepTitle>
      <Paragraph>{t('__EXPRESS_WIZARD_STEP_RECAP_DESCRIPTION')}</Paragraph>
      <CardDivider />

      <StyledFormField style={{ marginTop: `${appTheme.space.base * 10}px` }}>
        <StyledCard>
          <WhatConfirm {...props} />
        </StyledCard>
      </StyledFormField>

      {hasWhereStep ? (
        <StyledFormField style={{ marginTop: `${appTheme.space.base * 7}px` }}>
          <StyledCard>
            <WhereConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}

      {hasWhoStep ? (
        <StyledFormField style={{ marginTop: `${appTheme.space.base * 7}px` }}>
          <StyledCard>
            <WhoConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}

      <StyledFormField style={{ marginTop: `${appTheme.space.base * 7}px` }}>
        <StyledCard>
          <Grid>
            <Row>
              <WizardCol xs={12} sm={1}>
                <NotAllowedIcon />
              </WizardCol>
              <WizardCol xs={12} sm={11}>
                <StyledLabel>
                  {t('__EXPRESS_WIZARD_STEP_RECAP_OUT_OF_SCOPE_LABEL')}
                </StyledLabel>
                <StyledParagraph>
                  <Paragraph>
                    {t('__EXPRESS_WIZARD_STEP_RECAP_OUT_OF_SCOPE_DESCRIPTION')}
                  </Paragraph>
                </StyledParagraph>
                <StyledTextarea
                  {...getFieldProps('outOfScope')}
                  placeholder={t(
                    '__EXPRESS_WIZARD_STEP_RECAP_OUT_OF_SCOPE_PLACEHOLDER'
                  )}
                  minRows={6}
                />
                <TextareaNote>
                  <InfoIcon width="15" height="15" />
                  &nbsp;
                  {t('__EXPRESS_WIZARD_STEP_RECAP_MORE_TEXTAREA_NOTE')}
                </TextareaNote>
              </WizardCol>
            </Row>
          </Grid>
        </StyledCard>
      </StyledFormField>
    </ContainerCard>
  );
};

export const ConfirmationValidationSchema = Yup.object().shape({
  campaign_name: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED')
  ),
});
