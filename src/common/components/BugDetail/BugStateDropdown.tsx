import {
  Dropdown,
  Item,
  MD,
  Menu,
  Notification,
  Select,
  Separator,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { Circle } from 'src/common/components/CustomStatusDrawer/Circle';
import {
  Bug,
  BugCustomStatus,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';

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

  &[disabled]:hover {
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

const BugStateDropdown = ({ bug }: { bug: Bug }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [selectedItem, setSelectedItem] = useState<BugCustomStatus>(
    bug.custom_status
  );
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();

  useEffect(() => {
    setSelectedItem(bug.custom_status);
  }, [bug.custom_status]);
  const {
    currentData: cpCustomStatus,
    isLoading: isLoadingCustomStatus,
    isError: isErrorCustomStatus,
  } = useGetCampaignsByCidCustomStatusesQuery({
    cid: bug.campaign_id.toString(),
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

  if (!bug || !cpCustomStatus || isErrorCustomStatus || isLoadingCustomStatus)
    return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_STATE_LABEL')}
      </MD>
      <Dropdown
        selectedItem={selectedItem}
        onSelect={(item: BugCustomStatus) => {
          patchBug({
            cid: bug.campaign_id.toString(),
            bid: bug.id.toString(),
            body: {
              custom_status_id: item.id,
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
          setSelectedItem(item);
        }}
        downshiftProps={{
          itemToString: (item: BugCustomStatus) => item && item.id,
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
                <SelectedItem>
                  {t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}
                </SelectedItem>
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
    </div>
  );
};

export { BugStateDropdown, BugStateDropdownItem, BugStateDropdownMenu };
