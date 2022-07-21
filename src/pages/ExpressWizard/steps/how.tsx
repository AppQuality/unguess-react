import {
  Card,
  ContainerCard,
  Paragraph,
  Span,
  Textarea,
  theme as globalTheme,
  XL,
  XXL,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { ReactComponent as RightArrow } from 'src/assets/icons/chevron-right-icon.svg';
import { useAppDispatch } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { openUseCaseModal } from 'src/features/express/expressSlice';
import { WizardModel } from '../wizardModel';
import { CardDivider } from '../cardDivider';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.grey[800]};
  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledLanguageTitle = styled(XL)`
  padding-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const AddUseCaseCardButton = styled(Card)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;

const AddUseCaseCardButtonText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 ${({ theme }) => theme.space.base * 4}px;
`;

export const HowStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <ContainerCard>
        <StepTitle>
          <Span isBold>{t('__EXPRESS_WIZARD_STEP_HOW_LABEL')}</Span>&nbsp;
          {t('__EXPRESS_WIZARD_STEP_HOW_LABEL_EXTRA')}
        </StepTitle>
        <Paragraph>{t('__EXPRESS_WIZARD_STEP_HOW_SUBTITLE')}</Paragraph>
        <CardDivider />
        <StyledFormField>
          <StyledLanguageTitle>
            {t('__EXPRESS_WIZARD_STEP_HOW_FIELD_DESCRIPTION_TITLE')}
            <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
          </StyledLanguageTitle>
          <Paragraph>
            {t('__EXPRESS_WIZARD_STEP_HOW_FIELD_DESCRIPTION_DESCRIPTION')}
          </Paragraph>
          <Textarea
            rows={5}
            placeholder={t(
              '__EXPRESS_WIZARD_STEP_HOW_FIELD_DESCRIPTION_PLACEHOLDER'
            )}
            isResizable
            {...props.getFieldProps('outOfScope')}
            style={{ marginTop: globalTheme.space.md }}
          />
        </StyledFormField>
      </ContainerCard>
      <AddUseCaseCardButton
        onClick={() => dispatch(openUseCaseModal())}
        style={{ marginTop: globalTheme.space.md }}
      >
        <AddIcon />
        <AddUseCaseCardButtonText>
          <XL>{t('__EXPRESS_WIZARD_STEP_HOW_ADD_USE_CASE_CARD_TITLE')}</XL>
          <Paragraph>
            {t('__EXPRESS_WIZARD_STEP_HOW_ADD_USE_CASE_CARD_SUBTITLE')}
          </Paragraph>
        </AddUseCaseCardButtonText>
        <RightArrow />
      </AddUseCaseCardButton>
    </>
  );
};

export const HowStepValidationSchema = Yup.object().shape({});
