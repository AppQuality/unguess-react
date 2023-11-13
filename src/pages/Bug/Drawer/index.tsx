import {
  Button,
  Drawer,
  MD,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import {
  BugCustomStatus,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidCustomStatusesMutation,
} from 'src/features/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { CustomStatusForm } from './CustomStatusForm';
import { CustomStatusFormProps, validationSchema } from './formModel';
import { CloseDrawerModal } from '../Modals/ClosingDrawerConfirmationModal';
import { MigrationModal } from '../Modals/MigrationModal';

export const CustomStatusDrawer = () => {
  const { campaignId } = useParams();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isCustomStatusDrawerOpen } = useAppSelector(
    (state) => state.bugsPage
  );
  const { data: dbCustomStatus } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId?.toString() || '',
  });
  const [patchCustomStatuses] = usePatchCampaignsByCidCustomStatusesMutation();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isMigrationModalOpen, setIsMigrationModalOpen] = useState(false);
  const [deleteCustomStatusState, setDeleteCustomStatusState] = useState<
    BugCustomStatus[]
  >([]);
  const [patchCustomStatusState, setPatchCustomStatusState] = useState<
    BugCustomStatus[]
  >([]);

  const formInitialValues = {
    custom_statuses: dbCustomStatus?.filter((cs) => !cs.is_default) || [],
  };

  const onSubmit = (
    values: CustomStatusFormProps,
    formikProps: FormikHelpers<CustomStatusFormProps>
  ) => {
    const { custom_statuses } = values;
    if (!custom_statuses) return;

    formikProps.setSubmitting(true);

    // Check all dbCustomStatus ids that are not in the customStatus array
    const statusToBeDeleted =
      formInitialValues.custom_statuses.reduce((acc, cs) => {
        if (cs.is_default) return acc;
        if (!custom_statuses.find((rcs) => rcs.id === cs.id)) {
          acc.push(cs);
        }
        return acc;
      }, [] as BugCustomStatus[]) ?? [];
    setDeleteCustomStatusState(statusToBeDeleted);

    // Show migration modal only if there are custom statuses to delete
    if (statusToBeDeleted.length > 0) {
      setIsMigrationModalOpen(true);
    } else {
      if (values.custom_statuses.length > 0) {
        patchCustomStatuses({
          cid: campaignId?.toString() || '',
          body: values.custom_statuses.map((cs) => ({
            ...(cs.id && { custom_status_id: cs.id }),
            name: cs.name,
            color: cs.color,
          })),
        })
          .unwrap()
          .then((res) => {
            console.log('Patch completed', res);
          });
      }
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CONFIRM_TOAST')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
      dispatch(setCustomStatusDrawerOpen(false));
    }

    formikProps.setSubmitting(false);
  };

  const onClose = (props: FormikProps<CustomStatusFormProps>) => {
    if (props.dirty) {
      setIsConfirmationModalOpen(true);
    } else {
      dispatch(setCustomStatusDrawerOpen(false));
    }
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        validateOnChange
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formProps: FormikProps<CustomStatusFormProps>) => (
          <Drawer
            isOpen={isCustomStatusDrawerOpen}
            onClose={() => onClose(formProps)}
          >
            <Drawer.Header>
              {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_HEADER_TITLE')}
            </Drawer.Header>
            <Drawer.Body>
              <MD style={{ marginBottom: appTheme.space.lg }}>
                {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_BODY_DESCRIPTION')}
              </MD>
              <CustomStatusForm formikProps={formProps} />
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.FooterItem>
                <Button
                  id="custom-status-drawer-reset"
                  onClick={() => onClose(formProps)}
                  isBasic
                >
                  {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_RESET_BUTTON')}
                </Button>
              </Drawer.FooterItem>
              <Drawer.FooterItem>
                <Button
                  id="custom-status-drawer-confirm"
                  isPrimary
                  isAccent
                  disabled={formProps.isSubmitting}
                  onClick={formProps.submitForm}
                >
                  {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CONFIRM_BUTTON')}
                </Button>
              </Drawer.FooterItem>
            </Drawer.Footer>
            <Drawer.Close
              id="custom-status-drawer-close"
              onClick={() => onClose(formProps)}
            />
          </Drawer>
        )}
      </Formik>
      {isConfirmationModalOpen && (
        <CloseDrawerModal
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      )}
      {isMigrationModalOpen && (
        <MigrationModal
          customStatusesToPatch={patchCustomStatusState}
          customStatusesToDelete={deleteCustomStatusState}
          setIsMigrationModalOpen={setIsMigrationModalOpen}
        />
      )}
    </>
  );
};
