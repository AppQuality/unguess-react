import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronDownIcon } from 'src/assets/icons/chevron-down-stroke.svg';
import {
  SM,
  Spinner,
  SplitButton,
  theme as globalTheme,
  TooltipModal,
} from '@appquality/unguess-design-system';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { WaterButton } from '../../common/components/waterButton';
import { WizardModel } from './wizardModel';

const StyledDiv = styled.div`
  /** Horizontal Align */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HelpText = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-left: ${({ theme }) => theme.space.sm};
  max-width: 250px;
  position: absolute;
  right: 0;
`;

export const WizardSubmit = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { errors, isSubmitting, handleSubmit } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [refElement, setRefElement] = useState<HTMLButtonElement | null>();

  return (
    <StyledDiv>
      <SplitButton>
        <WaterButton
          id="express-wizard-submit-button"
          isPill
          isPrimary
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          onClick={() => handleSubmit()}
        >
          {t('__EXPRESS_WIZARD_CONFIRM_BUTTON_LABEL')}
        </WaterButton>
        <WaterButton
          isPill
          isPrimary
          ref={triggerRef}
          onClick={() => {
            setRefElement(triggerRef.current);
          }}
        >
          <ChevronDownIcon />
        </WaterButton>
      </SplitButton>
      {isSubmitting ? (
        <Spinner
          size="24"
          color={globalTheme.palette.blue[600]}
          style={{ marginLeft: globalTheme.space.sm }}
        />
      ) : (
        <HelpText>{t('__EXPRESS_WIZARD_SUBMIT_HELP_TEXT')}</HelpText>
      )}
      <TooltipModal
        referenceElement={refElement}
        onClose={() => setRefElement(null)}
        placement="auto"
        hasArrow={false}
      >
        <TooltipModal.Title>Tooltip modal header</TooltipModal.Title>
        <TooltipModal.Body>
          Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot
          courgette tatsoi pea sprouts fava bean collard greens dandelion okra
          wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
        </TooltipModal.Body>
        <TooltipModal.Close aria-label="Close" />
      </TooltipModal>
    </StyledDiv>
  );
};
