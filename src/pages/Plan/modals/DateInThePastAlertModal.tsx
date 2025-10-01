import {
  Button,
  FooterItem,
  Label,
  MD,
  Modal,
  ModalClose,
  Notification,
  Span,
  useToast,
  XL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import styled from 'styled-components';
import { usePlanContext } from '../context/planContext';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  > div {
    background-color: ${({ theme }) => theme.palette.grey[100]};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.grey[200]};
    padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  }
  ${MD} {
    color: ${({ theme }) => theme.palette.teal[700]};
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

const DateInThePastAlertModal = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { planId } = useParams();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { buyPlanAction } = usePlanContext();
  const { value } = useModule('dates');
  const [patchStatus, { isLoading }] = usePatchPlansByPidStatusMutation();

  // format the date in a more readable way
  const formattedDate = value?.output.start
    ? new Date(value.output.start).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const returnToDraft = async () => {
    patchStatus({
      pid: planId?.toString() ?? '',
      body: {
        status: 'draft',
      },
    })
      .unwrap()
      .then(() => {
        navigate(location.pathname, { replace: true });
      })
      .catch((err) => {
        console.error('Error updating plan status', err);
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={'Error updating plan status'}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
    onQuit();
  };
  return (
    <Modal onClose={onQuit} role="dialog">
      <Modal.Header>
        {t('__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_TITLE')}
      </Modal.Header>
      <Modal.Body style={{ overflow: 'visible' }}>
        <>
          <XL isBold>{t('__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_MESSAGE')}</XL>
          <MD style={{ margin: `${appTheme.space.sm} 0` }}>
            <Trans
              i18nKey="__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_HINT"
              components={{
                br: <br />,
              }}
            />
          </MD>

          <div style={{ padding: `${appTheme.space.md} 0` }}>
            <Label style={{ marginBottom: appTheme.space.sm }}>
              {t('__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_LABEL')}
            </Label>
            <Wrapper>
              <Trans
                i18nKey="__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_ORIGINAL"
                components={{
                  MD: <MD isBold />,
                  div: <div />,
                }}
                values={{
                  original_date: formattedDate,
                }}
              />
            </Wrapper>
            <Trans
              i18nKey="__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_FOOTER"
              components={{ MD: <MD />, Span: <Span isBold /> }}
              defaults="<Span>To postpone the start date:</Span> Return to draft for new approval"
            />
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <>
          <FooterItem>
            <Button isBasic onClick={returnToDraft} disabled={isLoading}>
              {t('__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_CLOSE_BUTTON')}
            </Button>
          </FooterItem>
          <FooterItem>
            <Button
              isPrimary
              isAccent
              onClick={buyPlanAction}
              disabled={isLoading}
            >
              {t('__PLAN_PAGE_MODAL_DATE_IN_THE_PAST_CONTINUE_BUTTON')}
            </Button>
          </FooterItem>
        </>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { DateInThePastAlertModal };
