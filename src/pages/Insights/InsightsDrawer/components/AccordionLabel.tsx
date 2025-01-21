import {
  AccordionNew,
  IconButton,
  Tooltip,
  useToast,
  Notification,
  Tag,
} from '@appquality/unguess-design-system';
import { ReactComponent as NotPublished } from '@zendeskgarden/svg-icons/src/16/lock-locked-stroke.svg';
import { ReactComponent as Published } from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
import {
  GetCampaignsByCidInsightsApiResponse,
  usePatchInsightsByIidMutation,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import { getBgColor, getSeverityColor } from '../../utils/getSeverityColor';

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
            ? `${`Scoperta "${title}" ${t('_TOAST_UNPUBLISHED_MESSAGE')}`}`
            : `${`Scoperta "${title}" ${t('_TOAST_PUBLISHED_MESSAGE')}`}`,
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
    <>
      <AccordionNew.Label
        label={title}
        subtitle={insight.usecases.map((usecase) => usecase.name).join(' - ')}
      />
      <AccordionNew.Meta>
        <Tag
          isPill
          color={getSeverityColor(insight.severity.name)}
          hue={getBgColor(insight.severity.name)}
        >
          {insight.severity.name}
        </Tag>
        <Tooltip
          size="small"
          type="light"
          placement="top-end"
          appendToNode={document.body}
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
      </AccordionNew.Meta>
    </>
  );
};
