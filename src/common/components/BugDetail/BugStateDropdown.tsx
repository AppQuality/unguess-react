import {
  Dropdown,
  Select,
  Item,
  Menu,
  Skeleton,
  Tooltip,
  Separator,
  MD,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import {
  Bug,
  BugCustomStatus,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { useAppDispatch } from 'src/app/hooks';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import useWindowSize from 'src/hooks/useWindowSize';
import { Circle } from 'src/pages/Bug/Drawer/Circle';

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
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
    margin-left: 1px; // fix icon alignment
  }
`;

const BugStateDropdown = ({ bug }: { bug: Bug }) => {
  const { t } = useTranslation();
  const { custom_status } = bug;
  const [selectedItem, setSelectedItem] = useState<BugCustomStatus>();
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const {
    data: cpBugStates,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidCustomStatusesQuery({
    cid: bug.campaign_id.toString(),
  });
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideManage = width < breakpointSm;

  // Split custom statuses by phase into an object with multiple arrays
  const customStatusesByPhase = cpBugStates?.reduce((acc, cs) => {
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
  }, [] as { id: number; name: string; customStatuses: typeof cpBugStates }[]);

  // Check selected custom status
  useEffect(() => {
    customStatusesByPhase?.find((phase) => {
      const found = phase.customStatuses.find(
        (cs) => cs.id === custom_status.id
      );
      if (found) {
        setSelectedItem(found);
      }
      return found;
    });
  }, [cpBugStates, custom_status]);

  const onManageClick = () => {
    dispatch(setCustomStatusDrawerOpen(true));
  };

  if (isError) return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_STATE_LABEL')}
      </MD>
      {isLoading || isFetching ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: appTheme.borderRadii.md }}
        />
      ) : (
        <Dropdown
          selectedItem={selectedItem}
          onSelect={async (item: BugCustomStatus) => {
            await patchBug({
              cid: bug.campaign_id.toString(),
              bid: bug.id.toString(),
              body: {
                custom_status_id: item.id,
              },
            });
            setSelectedItem(item);
          }}
          downshiftProps={{
            itemToString: (item: BugCustomStatus) => item && item.name,
          }}
        >
          <Field className="bug-dropdown-custom-status">
            {bug.status.id === 4 ? (
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
                  <SelectedItem>
                    <Circle
                      color={`#${selectedItem.color}`}
                      {...(selectedItem.id === 1 && {
                        style: {
                          border: `2px solid ${appTheme.palette.grey[400]}`,
                        },
                      })}
                    />{' '}
                    {selectedItem.name}
                  </SelectedItem>
                )}
              </Select>
            )}
          </Field>
          <Menu zIndex={1}>
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
                  {t(
                    '__BUGS_PAGE_BUG_DETAIL_CUSTOM_STATUS_DROPDOWN_MANAGE_LABEL'
                  )}
                </ManageItem>
              </>
            )}
          </Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default BugStateDropdown;
