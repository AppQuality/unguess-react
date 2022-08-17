import * as Yup from 'yup';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import {
  Paragraph,
  Span,
  XXL,
  theme as globalTheme,
  ContainerCard,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { addBusinessDays } from 'date-fns';
import { EXPRESS_3_BUSINESS_DAYS_TO_ADD } from 'src/constants';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WhereConfirm } from './confirm/whereConfirm';
import { WhoConfirm } from './confirm/whoConfirm';
import { WhatConfirm } from './confirm/whatConfirm';
import { HowConfirm } from './confirm/howConfirm';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
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
  const { values } = props;

  // Update the campaign_date_end field with the correct days to add
  values.campaign_date_end = addBusinessDays(
    new Date(),
    EXPRESS_3_BUSINESS_DAYS_TO_ADD
  );

  const hasWhatStep = values.campaign_name;
  const hasWhereStep = values.link;
  const hasWhoStep = values.age_range;
  const hasHowStep = values?.use_cases?.length;

  return (
    <ContainerCard>
      <StepTitle>
        <Span isBold>{t('__EXPRESS_WIZARD_STEP_RECAP_TITLE')}</Span>
      </StepTitle>
      <Paragraph>{t('__EXPRESS_WIZARD_STEP_RECAP_DESCRIPTION')}</Paragraph>
      <CardDivider />

      {hasWhatStep ? (
        <StyledFormField
          style={{ marginTop: `${globalTheme.space.base * 10}px` }}
        >
          <StyledCard>
            <WhatConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}

      {hasWhereStep ? (
        <StyledFormField
          style={{ marginTop: `${globalTheme.space.base * 7}px` }}
        >
          <StyledCard>
            <WhereConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}

      {hasWhoStep ? (
        <StyledFormField
          style={{ marginTop: `${globalTheme.space.base * 7}px` }}
        >
          <StyledCard>
            <WhoConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}

      {hasHowStep ? (
        <StyledFormField
          style={{ marginTop: `${globalTheme.space.base * 7}px` }}
        >
          <StyledCard>
            <HowConfirm {...props} />
          </StyledCard>
        </StyledFormField>
      ) : null}
    </ContainerCard>
  );
};

export const ConfirmationValidationSchema = Yup.object().shape({});
