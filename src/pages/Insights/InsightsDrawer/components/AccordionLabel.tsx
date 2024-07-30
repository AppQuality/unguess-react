import styled from 'styled-components';
import {
  Accordion,
  IconButton,
  LG,
  Tooltip,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { ReactComponent as Published } from '@zendeskgarden/svg-icons/src/16/eye-stroke.svg';
import { ReactComponent as NotPublished } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { usePatchInsightsByIidMutation } from 'src/features/api';
import { useTranslation } from 'react-i18next';

const Style = styled(Accordion.Label)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

interface Props {
  title: string;
  id: string;
  isPublished?: number;
}

export const AccordionLabel = ({ title, id, isPublished }: Props) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [patchInsight, result] = usePatchInsightsByIidMutation();
  const handlePublish = () => {
    let notificationProps = {};
    patchInsight({ iid: id, body: { visible: isPublished ? 0 : 1 } })
      .unwrap()
      .then(() => {
        notificationProps = {
          type: 'success',
          message: isPublished
            ? `${`Insight "${title}" ${t('_TOAST_UNPUBLISHED_MESSAGE')}`}`
            : `${`Insight "${title}" ${t('_TOAST_PUBLISHED_MESSAGE')}`}`,
        };
      })
      .catch((e) => {
        notificationProps = {
          type: 'error',
          message: e.message ? e.message : t('_TOAST_GENERIC_ERROR_MESSAGE'),
        };
      })
      .finally(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              closeText="X"
              isPrimary
              {...notificationProps}
            />
          ),
          { placement: 'top' }
        );
      });
  };
  return (
    <Style>
      <LG isBold>{title}</LG>
      <Tooltip
        size="small"
        type="light"
        content={
          isPublished
            ? 'Click to unpublish this insight'
            : 'Click to publish insight'
        }
      >
        <IconButton
          onClick={handlePublish}
          disabled={result.status === 'pending'}
        >
          {isPublished ? <Published /> : <NotPublished />}
        </IconButton>
      </Tooltip>
    </Style>
  );
};
