import {
  MD,
  Notification,
  Select,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { usePatchCampaignsByCidBugsAndBidMutation } from 'src/features/api';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import useStatusByPhase from './useStatusByPhase';

import BugStateSelect from '.';

const OpenEditStatusDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onManageClick = () => {
    dispatch(setCustomStatusDrawerOpen(true));
  };

  return (
    <Select.MenuOption
      value="manage"
      label={t('__BUGS_PAGE_BUG_DETAIL_CUSTOM_STATUS_DROPDOWN_MANAGE_LABEL')}
      icon={<GearIcon />}
      onClick={onManageClick}
    />
  );
};

const ChangeStatusDropdown = ({
  currentStatusId,
  campaignId,
  bugId,
  onChangeBefore,
}: {
  currentStatusId: number;
  campaignId: string;
  bugId: string;
  onChangeBefore?: (statusId: number) => void;
}) => {
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const {
    data: customStatusesByPhase,
    isLoading: isLoadingCustomStatus,
    isError: isErrorCustomStatus,
  } = useStatusByPhase({
    campaignId,
  });

  if (!customStatusesByPhase || isErrorCustomStatus || isLoadingCustomStatus)
    return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_STATE_LABEL')}
      </MD>
      <BugStateSelect
        currentStatusId={currentStatusId}
        phases={customStatusesByPhase}
        additionalOptions={<OpenEditStatusDrawer />}
        onChange={(statusId) => {
          if (onChangeBefore) {
            onChangeBefore(statusId);
          }
          patchBug({
            cid: campaignId,
            bid: bugId,
            body: {
              custom_status_id: statusId,
            },
          })
            .unwrap()
            .catch((e) => {
              if (e.status !== 500) {
                addToast(
                  ({ close }) => (
                    <Notification
                      onClose={close}
                      type="error"
                      message={t(
                        '__BUGS_PAGE_CUSTOM_STATUS_DRAWER_ERROR_TOAST_API'
                      )}
                      closeText={t('__TOAST_CLOSE_TEXT')}
                      isPrimary
                    />
                  ),
                  { placement: 'top' }
                );
              }
            });
        }}
      />
    </div>
  );
};

export default ChangeStatusDropdown;
