import styled from 'styled-components';
import {
  Accordion,
  IconButton,
  LG,
  Tooltip,
  useToast,
  Notification,
  Tag,
  SM,
} from '@appquality/unguess-design-system';
import { ReactComponent as Published } from '@zendeskgarden/svg-icons/src/16/lock-locked-stroke.svg';
import { ReactComponent as NotPublished } from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
import {
  GetCampaignsByCidInsightsApiResponse,
  usePatchInsightsByIidMutation,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import { getBgColor, getSeverityColor } from '../../utils/getSeverityColor';

const Style = styled(Accordion.Label)`
  display: grid;
  grid-template-areas:
    'title icon'
    'usecase icon';
  gap: ${({ theme }) => theme.space.sm};
  .icon-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: icon;
    height: 100%;
  }
`;

export const AccordionLabel = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { t } = useTranslation();
  const { id, title, visible } = insight;
  const { addToast } = useToast();
  const [patchInsight, result] = usePatchInsightsByIidMutation();
  const handlePublish = () => {
    let notificationProps = {};
    patchInsight({ iid: id.toString(), body: { visible: visible ? 0 : 1 } })
      .unwrap()
      .then(() => {
        notificationProps = {
          type: 'success',
          message: visible
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
      <LG isBold style={{ gridArea: 'title' }}>
        {title}
      </LG>
      <div className="icon-button-wrapper">
        <Tooltip
          content={
            visible
              ? 'Click to unpublish this insight'
              : 'Click to publish insight'
          }
        >
          <IconButton
            onClick={handlePublish}
            disabled={result.status === 'pending'}
          >
            {visible ? <Published /> : <NotPublished />}
          </IconButton>
        </Tooltip>
      </div>
      <div style={{ display: 'flex', gridArea: 'usecase' }}>
        <Tag
          isPill
          color={getSeverityColor(insight.severity.name)}
          hue={getBgColor(insight.severity.name)}
        >
          {insight.severity.name}
        </Tag>
        {insight.usecases.map((usecase) => (
          <SM>{usecase.name}</SM>
        ))}
      </div>
    </Style>
  );
};
