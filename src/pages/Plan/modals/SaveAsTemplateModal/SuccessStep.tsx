import { Button, FooterItem, MD, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ReactComponent as SuccessImage } from './SaveAsTemplateSuccess.svg';
import { useSaveTemplate } from './useSaveTemplate';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space.sm} 0;
  gap: ${({ theme }) => theme.space.md};
`;

const SuccessStep = () => {
  const { t } = useTranslation();
  return (
    <Wrapper data-qa="save-as-template-success-step">
      <XL isBold>{t('SAVE_AS_TEMPLATE_SUCCESS_TITLE')}</XL>
      <SuccessImage />
      <div>
        <MD isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('SAVE_AS_TEMPLATE_SUCCESS_TEXT_1')}
        </MD>
        <MD>{t('SAVE_AS_TEMPLATE_SUCCESS_TEXT_2')}</MD>
      </div>
    </Wrapper>
  );
};

const SuccessStepFooter = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { reset } = useSaveTemplate();
  const navigate = useNavigate();

  return (
    <>
      <FooterItem>
        <Button
          isBasic
          onClick={() => {
            reset();
            navigate('/templates');
          }}
        >
          {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_VIEW_TEMPLATES')}
        </Button>
      </FooterItem>
      <FooterItem>
        <Button isAccent isPrimary onClick={() => onQuit()}>
          {t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CONTINUE_SETUP')}
        </Button>
      </FooterItem>
    </>
  );
};

SuccessStep.Footer = SuccessStepFooter;

export { SuccessStep };
