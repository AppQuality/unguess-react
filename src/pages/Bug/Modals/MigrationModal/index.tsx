import {
  Button,
  Col,
  Grid,
  Modal,
  ModalClose,
  Paragraph,
  Row,
  Span,
  Dropdown,
  Select,
} from '@appquality/unguess-design-system';
import { Label, MediaInput } from '@zendeskgarden/react-forms';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';
import styled from 'styled-components';
import {
  BugCustomStatus,
  useDeleteCampaignsByCidCustomStatusesMutation,
  useGetCampaignsByCidBugsQuery,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidCustomStatusesMutation,
} from 'src/features/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Field } from '@zendeskgarden/react-dropdowns';
import {
  BugStateDropdownItem,
  BugStateDropdownMenu,
} from 'src/common/components/BugDetail/BugStateDropdown';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { useAppDispatch } from 'src/app/hooks';
import { Circle } from '../../Drawer/Circle';

const MigrationItemsList = styled.ul`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const MigrateModalBody = styled(Modal.Body)`
  max-height: 340px;
`;

const StyledCol = styled(Col)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

type MigrationItem = {
  custom_status_id: number;
  to_custom_status_id: number;
};

export const MigrationModal = ({
  customStatusesToPatch = [],
  customStatusesToDelete = [],
  setIsMigrationModalOpen,
}: {
  customStatusesToPatch: (Omit<BugCustomStatus, 'id'> & {
    id?: number;
  })[];
  customStatusesToDelete: BugCustomStatus[];
  setIsMigrationModalOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const [patchCustomStatuses] = usePatchCampaignsByCidCustomStatusesMutation();
  const [deleteCustomStatuses] =
    useDeleteCampaignsByCidCustomStatusesMutation();
  const { data: bugs } = useGetCampaignsByCidBugsQuery({
    cid: campaignId?.toString() || '',
  });
  const { data: cpCustomStatuses } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId?.toString() || '',
  });

  // Split custom statuses by phase into an object with multiple arrays
  const customStatusesByPhase = cpCustomStatuses?.reduce((acc, cs) => {
    const phase = acc.find((p) => p.id === cs.phase.id);
    if (phase) {
      phase.customStatuses.push(cs);
    } else {
      acc.push({
        id: cs.phase.id,
        name: cs.phase.name,
        customStatuses: [cs],
      });
    }
    return acc;
  }, [] as { id: number; name: string; customStatuses: typeof cpCustomStatuses }[]);

  // Check if deleteCustomStatus is used in bugs and create an array of them
  const deleteCustomStatusUsed =
    customStatusesToDelete.filter((cs) =>
      bugs?.items?.find((b) => b.custom_status.id === cs.id)
    ) ?? [];

  // Create an array of customStatus ids that are not used in bugs
  const deleteCustomStatusUnused =
    customStatusesToDelete?.filter(
      (cs) => !deleteCustomStatusUsed.find((dcs) => dcs.id === cs.id)
    ) ?? [];

  const [selectedItems, setSelectedItems] = useState<MigrationItem[]>(
    deleteCustomStatusUsed.map((cs) => ({
      custom_status_id: cs.id,
      to_custom_status_id: 1,
    }))
  );

  const onQuit = () => {
    setIsMigrationModalOpen(false);
  };

  const onConfirm = async () => {
    if (customStatusesToPatch.length > 0) {
      await patchCustomStatuses({
        cid: campaignId?.toString() || '',
        body: customStatusesToPatch,
      });
    }

    if (customStatusesToDelete.length > 0) {
      await deleteCustomStatuses({
        cid: campaignId?.toString() || '',
        body: [
          ...deleteCustomStatusUnused.map((cs) => ({
            custom_status_id: cs.id,
          })),
          ...selectedItems,
        ],
      });
    }

    setIsMigrationModalOpen(false);
    dispatch(setCustomStatusDrawerOpen(false));
  };

  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_HEADER_TITLE')}
      </Modal.Header>
      <MigrateModalBody>
        {deleteCustomStatusUnused.length > 0 && (
          <Paragraph>
            <Trans i18nKey="__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_TEXT_STATUS_NO_BUGS">
              You are about to delete more than one status. Currently{' '}
              <Span isBold>
                {{
                  custom_statuses: deleteCustomStatusUnused
                    .map((cs) => cs.name)
                    .join(', '),
                }}
              </Span>{' '}
              are not associated with any bugs.
            </Trans>
          </Paragraph>
        )}
        {cpCustomStatuses && deleteCustomStatusUsed.length > 0 && (
          <>
            <Paragraph>
              <Trans i18nKey="__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_TEXT_STATUS_BUGS">
                Before confirming and deleting, choose how to handle{' '}
                <Span isBold>
                  {{ custom_statuses_num: deleteCustomStatusUsed.length }} bugs
                </Span>{' '}
                in this campaign associated with these status:
              </Trans>
            </Paragraph>
            <MigrationItemsList>
              {deleteCustomStatusUsed.map((cs) => (
                <Grid>
                  <Row>
                    <StyledCol>
                      <Label>
                        {t(
                          '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_DELETE'
                        )}
                      </Label>
                    </StyledCol>
                    <StyledCol xs={2}>&nbsp;</StyledCol>
                    <StyledCol>
                      <Label>
                        {t(
                          '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_MIGRATE_TO'
                        )}
                      </Label>
                    </StyledCol>
                  </Row>
                  <Row>
                    <StyledCol>
                      <MediaInput
                        disabled
                        start={<Circle color={`#${cs.color}`} />}
                        value={cs.name}
                        isCompact
                        style={{ textTransform: 'capitalize' }}
                      />
                    </StyledCol>
                    <StyledCol
                      xs={2}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ArrowRight width={28} />
                    </StyledCol>
                    <StyledCol>
                      <Dropdown
                        selectedItem={cpCustomStatuses.find(
                          (c) =>
                            c.id ===
                            (selectedItems.find(
                              (i) => i.custom_status_id === cs.id
                            )?.to_custom_status_id ?? 1)
                        )}
                        downshiftProps={{
                          itemToString: (item: BugCustomStatus) => item,
                        }}
                        onSelect={(item: BugCustomStatus) => {
                          setSelectedItems((prev) => {
                            const index = prev.findIndex(
                              (i) => i.custom_status_id === cs.id
                            );
                            prev[`${index}`] = {
                              custom_status_id: cs.id,
                              to_custom_status_id: item.id,
                            };
                            return [...prev];
                          });
                        }}
                      >
                        <Field className="bug-dropdown-custom-status">
                          <Select isCompact>
                            <BugStateDropdownItem
                              customStatus={cpCustomStatuses.find(
                                (c) =>
                                  c.id ===
                                  (selectedItems.find(
                                    (i) => i.custom_status_id === cs.id
                                  )?.to_custom_status_id ?? 1)
                              )}
                            />
                          </Select>
                        </Field>
                        <BugStateDropdownMenu
                          isEditable={false}
                          customStatusesByPhase={
                            customStatusesByPhase
                              ? customStatusesByPhase?.map((phase) => ({
                                  ...phase,
                                  customStatuses: phase.customStatuses.filter(
                                    (c) => cs.id !== c.id
                                  ),
                                }))
                              : []
                          }
                        />
                      </Dropdown>
                    </StyledCol>
                  </Row>
                </Grid>
              ))}
            </MigrationItemsList>
          </>
        )}
      </MigrateModalBody>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          id="custom-status-migration-modal-cancel"
          isPrimary
          isLink
          onClick={onQuit}
        >
          {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_CANCEL_BUTTON')}
        </Button>
        <Button
          id="custom-status-migration-modal-confirm"
          isPrimary
          isAccent
          onClick={onConfirm}
        >
          {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_CONFIRM_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};
