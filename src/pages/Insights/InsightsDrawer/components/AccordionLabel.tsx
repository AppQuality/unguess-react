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
import { ReactComponent as NotPublished } from '@zendeskgarden/svg-icons/src/16/lock-locked-stroke.svg';
import { ReactComponent as Published } from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
import {
  GetCampaignsByCidInsightsApiResponse,
  usePatchInsightsByIidMutation,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import { getBgColor, getSeverityColor } from '../../utils/getSeverityColor';

const Style = styled(Accordion.Label)`
  padding-right: 0;
  padding-left: 0;
  display: grid;
  grid-template-areas:
    'title icon'
    'usecase icon';
  gap: ${({ theme }) => theme.space.sm};

  .icon-button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-area: icon;
    height: 100%;
  }
  .severity-usecase-wrapper {
    display: flex;
    grid-area: usecase;
    align-items: center;

    .usecase-names {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 218px;
    }
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
  const handlePublish = (evt: any) => {
    evt.stopPropagation();
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
          size="small"
          type="light"
          placement="top-end"
          content={
            visible
              ? t('__INSIGHTS_PAGE_DRAWER_UNPUBLISH')
              : t('__INSIGHTS_PAGE_DRAWER_PUBLISH')
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
      <div className="severity-usecase-wrapper">
        <Tag
          isPill
          color={getSeverityColor(insight.severity.name)}
          hue={getBgColor(insight.severity.name)}
        >
          {insight.severity.name}
        </Tag>
        <SM className="usecase-names">
          {insight.usecases.map((usecase, i) => (
            <span>
              {i > 0 && ' - '}
              {usecase.name}
            </span>
          ))}
        </SM>
      </div>
    </Style>
  );
};
