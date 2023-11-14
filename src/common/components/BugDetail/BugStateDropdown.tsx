import {
  Dropdown,
  Select,
  Item,
  Menu,
  Skeleton,
  Tooltip,
  Separator,
  MD,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import {
  BugCustomStatus,
  useGetCampaignsByCidBugsAndBidQuery,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { useAppDispatch } from 'src/app/hooks';
import {
  setCustomStatusDrawerOpen,
  getSelectedBugId,
} from 'src/features/bugsPage/bugsPageSlice';
import useWindowSize from 'src/hooks/useWindowSize';
import { Circle } from 'src/common/components/CustomStatusDrawer/Circle';
import { useParams } from 'react-router-dom';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';

const StyledMenu = styled(Menu)`
  &::-webkit-scrollbar {
    display: block;
  }
`;

const StyledItem = styled(Item)`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const ManageItem = styled(StyledItem)`
  padding-left: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.blue[600]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  text-transform: none;

  &[disabled] {
    ${(props) => retrieveComponentStyles('navigation.hoverableItem', props)};
    border-radius: 0 !important;
  }
`;

export const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
    margin-left: 1px; // fix icon alignment
  }
`;

const BugStateDropdownItem = ({
  customStatus,
}: {
  customStatus?: BugCustomStatus;
}) => {
  if (!customStatus) return null;

  return (
    <SelectedItem>
      <Circle
        color={`#${customStatus.color}`}
        {...(customStatus.id === 1 && {
          style: {
            border: `2px solid ${appTheme.palette.grey[400]}`,
          },
        })}
      />{' '}
      {customStatus.name}
    </SelectedItem>
  );
};

const BugStateDropdownMenu = ({
  customStatusesByPhase,
  isEditable = false,
}: {
  customStatusesByPhase: {
    id: number;
    name: string;
    customStatuses: BugCustomStatus[];
  }[];
  isEditable?: boolean;
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideManage = width < breakpointSm || !isEditable;
  const dispatch = useAppDispatch();

  const onManageClick = () => {
    dispatch(setCustomStatusDrawerOpen(true));
  };

  return (
    <StyledMenu zIndex={1} style={{ maxHeight: '200px' }}>
      {customStatusesByPhase &&
        customStatusesByPhase.map((phase, i) => (
          <>
            {phase.customStatuses.map((cs) => (
              <StyledItem
                key={cs.name}
                value={cs}
                className={`bug-dropdown-custom-status-${cs.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                <Circle
                  color={`#${cs.color}`}
                  {...(cs.id === 1 && {
                    style: {
                      border: `2px solid ${appTheme.palette.grey[400]}`,
                    },
                  })}
                />{' '}
                {cs.name}
              </StyledItem>
            ))}
            {i < customStatusesByPhase.length - 1 && <Separator />}
          </>
        ))}
      {!hideManage && (
        <>
          <Separator />
          <ManageItem
            disabled
            value={{}}
            key="manage-custom-status"
            className="bug-dropdown-custom-status-manage"
            onClick={onManageClick}
          >
            <GearIcon />{' '}
            {t('__BUGS_PAGE_BUG_DETAIL_CUSTOM_STATUS_DROPDOWN_MANAGE_LABEL')}
          </ManageItem>
        </>
      )}
    </StyledMenu>
  );
};

const BugStateDropdown = () => {
  const { t } = useTranslation();
  const { campaignId, bugId } = useParams();
  const { addToast } = useToast();
  const [selectedItem, setSelectedItem] = useState<BugCustomStatus>();
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const selectedBugId = getSelectedBugId();

  let bid: string = '';
  if (selectedBugId) {
    bid = selectedBugId.toString();
  } else if (bugId) {
    bid = bugId.toString();
  }

  const {
    currentData: cpCustomStatus,
    isLoading: isLoadingCustomStatus,
    isFetching: isFetchingCustomStatus,
    isError: isErrorCustomStatus,
  } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId ? campaignId.toString() : '',
  });
  const {
    currentData: bug,
    isLoading: isLoadingBug,
    isFetching: isFetchingBug,
    isError: isErrorBug,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId ? campaignId.toString() : '',
    bid,
  });

  // Split custom statuses by phase into an object with multiple arrays
  const customStatusesByPhase = cpCustomStatus?.reduce((acc, cs) => {
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
  }, [] as { id: number; name: string; customStatuses: typeof cpCustomStatus }[]);

  // Check selected custom status
  useEffect(() => {
    if (!bug) return;

    customStatusesByPhase?.find((phase) => {
      const found = phase.customStatuses.find(
        (cs) => cs.id === bug.custom_status.id
      );
      if (found) {
        setSelectedItem(found);
      }
      return found;
    });
  }, [bug, cpCustomStatus]);

  if (
    !bug ||
    !cpCustomStatus ||
    isErrorBug ||
    isErrorCustomStatus ||
    isLoadingBug ||
    isLoadingCustomStatus
  )
    return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_STATE_LABEL')}
      </MD>
      {isFetchingBug || isFetchingCustomStatus ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: appTheme.borderRadii.md }}
        />
      ) : (
        <Dropdown
          selectedItem={selectedItem}
          onSelect={(item: BugCustomStatus) => {
            patchBug({
              cid: campaignId ? campaignId.toString() : '',
              bid,
              body: {
                custom_status_id: item.id,
              },
            })
              .unwrap()
              .then(() => {
                setSelectedItem(item);
              })
              .catch(() => {
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
              });
          }}
          downshiftProps={{
            itemToString: (item: BugCustomStatus) => item && item.name,
          }}
        >
          <Field className="bug-dropdown-custom-status">
            {bug && bug.status.id === 4 ? (
              <Tooltip
                appendToNode={document.body}
                type="light"
                content={t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW_TOOLTIP')}
              >
                <Select isCompact disabled>
                  <StyledItem>
                    {t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}
                  </StyledItem>
                </Select>
              </Tooltip>
            ) : (
              <Select isCompact>
                {selectedItem && (
                  <BugStateDropdownItem customStatus={selectedItem} />
                )}
              </Select>
            )}
          </Field>
          <BugStateDropdownMenu
            isEditable
            customStatusesByPhase={customStatusesByPhase ?? []}
          />
        </Dropdown>
      )}
    </div>
  );
};

export { BugStateDropdown, BugStateDropdownMenu, BugStateDropdownItem };
