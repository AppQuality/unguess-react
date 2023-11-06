import {
  Button,
  Modal,
  ModalClose,
  Paragraph,
} from '@appquality/unguess-design-system';
import { Label, MediaInput } from '@zendeskgarden/react-forms';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownItem } from 'src/pages/Dashboard/filters/utils';
import { ReactComponent as ArrowRightIcon } from 'src/assets/icons/arrow-right.svg';
import styled from 'styled-components';

const MigrationItemsList = styled.ul`
  padding-top: 12px;
`;
const MigrationItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const MigrationItem = styled.div`
  padding-bottom: 20px;
`;
const CustomStatusColor = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const ArrowRight = styled(ArrowRightIcon)`
  margin-top: 10px;
`;
const MigrateModalBody = styled(Modal.Body)`
  max-height: 340px;
`;

export const MigrationModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>();

  return (
    <Modal>
      <Modal.Header isDanger>
        {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_HEADER_TITLE')}
      </Modal.Header>
      <MigrateModalBody>
        <Paragraph>
          {t(
            '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_TEXT_STATUS_NO_BUGS'
          )}
        </Paragraph>
        <Paragraph>
          {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_TEXT_STATUS_BUGS')}
        </Paragraph>
        <MigrationItemsList>
          <MigrationItemContainer>
            <MigrationItem>
              <Label>
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_DELETE'
                )}
              </Label>
              <MediaInput
                disabled
                start={<CustomStatusColor color="black" />}
              />
            </MigrationItem>
            <ArrowRight width={28} />
            <MigrationItem>
              <Label>
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_MIGRATE_TO'
                )}
              </Label>
              <MediaInput
                readOnly
                start={<CustomStatusColor color="black" />}
              />
            </MigrationItem>
          </MigrationItemContainer>
          <MigrationItemContainer>
            <MigrationItem>
              <Label>
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_DELETE'
                )}
              </Label>
              <MediaInput
                disabled
                start={<CustomStatusColor color="black" />}
              />
            </MigrationItem>
            <ArrowRight width={28} />
            <MigrationItem>
              <Label>
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_MIGRATE_TO'
                )}
              </Label>
              <MediaInput
                readOnly
                start={<CustomStatusColor color="black" />}
              />
            </MigrationItem>
          </MigrationItemContainer>
          <MigrationItemContainer>
            <MigrationItem>
              <Label>
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_DELETE'
                )}
              </Label>
              <MediaInput
                disabled
                start={<CustomStatusColor color="black" />}
              />
            </MigrationItem>
            <ArrowRight width={28} />
            <MigrationItem>
              <Label>
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_BODY_STATUS_TO_MIGRATE_TO'
                )}
              </Label>
              <MediaInput
                readOnly
                start={<CustomStatusColor color="black" />}
              />
            </MigrationItem>
          </MigrationItemContainer>
        </MigrationItemsList>
      </MigrateModalBody>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          id="custom-status-migration-modal-cancel"
          isPrimary
          isLink
        >
          {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_CANCEL_BUTTON')}
        </Button>
        <Button id="custom-status-migration-modal-confirm" isPrimary isAccent>
          {t('__BUGS_PAGE_CUSTOM_STATUS_MIGRATION_MODAL_CONFIRM_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={() => setIsModalOpen(false)} />
    </Modal>
  );
};
