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
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { ReactComponent as RightArrow } from 'src/assets/icons/arrow-right.svg';
import { useState } from 'react';

const MoveCampaignModal = ({
  cpTitle,
  onClose,
}: {
  cpTitle: string;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const [selectedProjectId, setSelectedProjectId] = useState<number>();

  const { data, isLoading, isFetching } = useGetWorkspacesByWidProjectsQuery({
    wid: activeWorkspace?.id.toString() || '',
  });

  const projects = data?.items;

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
              <MD style={{ marginTop: appTheme.space.xs }}>{cpTitle}</MD>
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
              {!projects || isLoading || isFetching ? (
                <Skeleton />
              ) : (
                <Select
                  isCompact
                  label={t('__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_SELECT_LABEL')}
                  placeholder={t(
                    '__CAMPAIGN_PAGE_MOVE_CAMPAIGN_MODAL_SELECT_PLACEHOLDER'
                  )}
                  onSelect={(prjId) => {
                    setSelectedProjectId(parseInt(prjId, 10));
                  }}
                >
                  {projects.map((item) => (
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
          isPrimary
          isAccent
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`Move campaign action with project id ${selectedProjectId}`);
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
