import {
  ContainerCard,
  Paragraph,
  Span,
  XXL,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useEffect } from 'react';
import { appTheme } from 'src/app/theme';
import { EXPRESS_3_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';
import * as Yup from 'yup';
import { HowConfirm } from './confirm/howConfirm';
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

export const ConfirmationStep = (props: FormikProps<WizardModel>) => {
  const { values, setFieldValue } = props;

  useEffect(() => {
    // This XPS require more time to be completed, so we update the default duration value
    setFieldValue('base_cp_duration', EXPRESS_3_BUSINESS_DAYS_TO_ADD);
    setFieldValue('target_size', 6);
  }, []);

  const hasWhereStep = values.link || values.iOSLink || values.androidLink;
  const hasWhoStep = values.age_range;
  const hasHowStep = values?.use_cases?.length;

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

      {hasHowStep ? (
        <StyledFormField style={{ marginTop: `${appTheme.space.base * 7}px` }}>
          <StyledCard>
            <HowConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}
    </ContainerCard>
  );
};

export const ConfirmationValidationSchema = Yup.object().shape({
  campaign_name: Yup.string().required(
    t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED')
  ),
});
