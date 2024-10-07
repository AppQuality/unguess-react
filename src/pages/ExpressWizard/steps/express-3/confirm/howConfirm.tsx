import {
  Grid,
  Row,
  Label,
  Paragraph,
  Span,
  OrderedList,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ReactComponent as HowIcon } from 'src/assets/icons/step-how-icon.svg';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const HowConfirm = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { values } = props;
  const useCasesCount = values.use_cases ? values.use_cases.length : 0;
  const useCases = values.use_cases || [];

  return (
    <Grid>
      <Row>
        <WizardCol xs={12} sm={1}>
          <HowIcon />
        </WizardCol>
        <WizardCol xs={12} sm={11}>
          <StyledLabel>{t('__EXPRESS_WIZARD_STEP_HOW_LABEL')}</StyledLabel>
          <StyledParagraph>
            <Trans
              i18nKey="__EXPRESS_WIZARD_STEP_RECAP_HOW_CONTENT_TEXT"
              components={{
                span: <Span isBold />,
              }}
              values={{
                use_cases_count: useCasesCount,
              }}
              default="You inserted <span>{{ use_cases_count }} test cases:</span>"
            />
            <OrderedList>
              {useCases.map((useCase) => (
                <OrderedList.Item>
                  <Span isBold>{useCase.title}</Span>;
                </OrderedList.Item>
              ))}
            </OrderedList>
          </StyledParagraph>
        </WizardCol>
      </Row>
    </Grid>
  );
};
