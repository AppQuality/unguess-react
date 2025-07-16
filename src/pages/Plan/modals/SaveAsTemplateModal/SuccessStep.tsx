import { Button, FooterItem, MD, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as SuccessImage } from './SaveAsTemplateSuccess.svg';
import { useSaveTemplate } from './useSaveTemplate';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.sm} 0;
  gap: ${({ theme }) => theme.space.md};
`;

const SuccessStep = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <XL isBold>{t('SAVE_AS_TEMPLATE_SUCCESS_TITLE')}</XL>
      <SuccessImage />
      <MD isBold>{t('SAVE_AS_TEMPLATE_SUCCESS_TEXT_1')}</MD>
      <MD>{t('SAVE_AS_TEMPLATE_SUCCESS_TEXT_2')}</MD>
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
