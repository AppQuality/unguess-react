import {
  Alert,
  Button,
  Col,
  Grid,
  Label,
  MD,
  Modal,
  ModalClose,
  Row,
  Select,
  Skeleton,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import {
  CampaignWithOutput,
  useGetWorkspacesByWidProjectsQuery,
  usePatchCampaignsByCidMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { ReactComponent as RightArrow } from 'src/assets/icons/arrow-right.svg';
import { useState } from 'react';
import { useSendGTMevent } from 'src/hooks/useGTMevent';

const MoveCampaignModal = ({
  campaign,
  onClose,
}: {
  campaign: CampaignWithOutput;
  onClose: () => void;
}) => {
  const {
    id: cpId,
    customer_title: cpTitle,
    project: { id: prjId, name: prjName },
  } = campaign;
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  const [patchCampaign] = usePatchCampaignsByCidMutation();
  const { addToast } = useToast();

  const { data, isLoading, isFetching } = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id.toString() || '',
  });

  const projects = data?.items;

  // Filter out the current project
  const filteredProjects = projects?.filter((item) => item.id !== prjId);
  const sendGTMEvent = useSendGTMevent();
  return (
    <Modal onClose={onClose}>
      <Modal.Header isDanger>
        {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
        <MD style={{ marginBottom: appTheme.space.md }}>
          <Trans i18nKey="__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_DESCRIPTION_1">
            You are about to remove {{ name: cpTitle }} from the current
            project.
          </Trans>
        </MD>
        <MD style={{ marginBottom: appTheme.space.md }}>
          {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_DESCRIPTION_2')}
        </MD>
        <Grid style={{ margin: `${appTheme.space.md} auto` }}>
          <Row>
            <Col size={5} style={{ margin: 0 }}>
              <Label>
                {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_LABEL_PROJECT')}
              </Label>
              <MD style={{ marginTop: appTheme.space.xs }}>{prjName}</MD>
            </Col>
            <Col
              size={2}
              alignSelf="center"
              textAlign="center"
              style={{ margin: 0 }}
            >
              <MD>&nbsp;</MD>
              <RightArrow style={{ marginTop: appTheme.space.xs }} />
            </Col>
            <Col size={5} style={{ margin: 0 }}>
              <Label
                style={{ display: 'block', marginBottom: appTheme.space.xs }}
              >
                {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_SELECT_LABEL')}
              </Label>
              {!filteredProjects || isLoading || isFetching ? (
                <Skeleton
                  style={{
                    height: appTheme.space.lg,
                    borderRadius: appTheme.borderRadii.md,
                  }}
                />
              ) : (
                <Select
                  isCompact
                  placeholder={t(
                    '__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_SELECT_PLACEHOLDER'
                  )}
                  onSelect={(pId) => {
                    setSelectedProjectId(parseInt(pId, 10));
                  }}
                >
                  {filteredProjects.map((item) => (
                    <Select.Option
                      key={item.id}
                      value={item.id.toString()}
                      label={item.name}
                      className={`campaign-page-move-campaign-modal-select-option-project-${item.id}`}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Col>
          </Row>
        </Grid>
        <Alert type="info">
          <Alert.Title>
            {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_ALERT_TITLE')}
          </Alert.Title>
          {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_ALERT_MESSAGE')}
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button isBasic isDanger onClick={onClose}>
          {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_BUTTON_CANCEL')}
        </Button>
        <Button
          disabled={!selectedProjectId}
          isPrimary
          isAccent
          onClick={async () => {
            await patchCampaign({
              cid: cpId?.toString() ?? '0',
              body: {
                project_id: selectedProjectId,
              },
            })
              .unwrap()
              .then(() => {
                sendGTMEvent({
                  event: 'workspaces-action',
                  category: '',
                  action: 'move',
                  content: 'campaign',
                });
                addToast(
                  ({ close }) => (
                    <Notification
                      onClose={close}
                      type="success"
                      message={t(
                        '__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MOVE_CAMPAIGN_TOAST_SUCCESS'
                      )}
                      closeText={t('__TOAST_CLOSE_TEXT')}
                      isPrimary
                    />
                  ),
                  { placement: 'top' }
                );
              })
              .catch(() => {
                addToast(
                  ({ close }) => (
                    <Notification
                      onClose={close}
                      type="error"
                      message={t(
                        '__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MOVE_CAMPAIGN_TOAST_ERROR'
                      )}
                      closeText={t('__TOAST_CLOSE_TEXT')}
                      isPrimary
                    />
                  ),
                  { placement: 'top' }
                );
              });
          }}
        >
          {t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_BUTTON_CONFIRM')}
        </Button>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { MoveCampaignModal };
