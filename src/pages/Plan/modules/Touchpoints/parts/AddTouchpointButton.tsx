import { Button, getColor } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import styled from 'styled-components';
import { useModuleTouchpointsContext } from '../context';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.xxl};
  padding: ${({ theme }) => theme.space.xs};
  border-left: 4px solid ${({ theme }) => getColor(theme.colors.accentHue, 600)};
`;

const AddTouchpointButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setModalRef } = useModuleTouchpointsContext();

  return (
    <ButtonContainer>
      <Button
        isBasic
        isPill
        isAccent
        ref={triggerRef}
        onClick={() => setModalRef(triggerRef.current)}
      >
        <Button.StartIcon>
          <PlusIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_BUTTON')}
      </Button>
    </ButtonContainer>
  );
};

export { AddTouchpointButton };
