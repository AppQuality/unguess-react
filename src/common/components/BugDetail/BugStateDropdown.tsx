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
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { BugStateIcon } from 'src/common/components/BugStateIcon';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { useAppDispatch } from 'src/app/hooks';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';

const StyledItem = styled(Item)`
  display: flex;
  align-items: center;

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

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
    margin-left: 1px; // fix icon alignment
  }
`;

type DropdownItem = {
  id: number;
  text: string;
  slug: string;
  icon: React.ReactNode;
};

const BugStateDropdown = ({ bug }: { bug: Bug }) => {
  const { t } = useTranslation();
  const { custom_status } = bug;
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>();
  const [options, setOptions] = useState<DropdownItem[]>([]);
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

  const sortStates = (a: DropdownItem, b: DropdownItem) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  };

  useEffect(() => {
    if (cpBugStates) {
      setOptions(
        cpBugStates
          .map((bugState) => ({
            id: bugState.id,
            slug: bugState.name,
            text: getCustomStatusInfo(bugState.name as BugState, t).text,
            icon: (
              <BugStateIcon
                {...appTheme.colors.byBugState[bugState.name as BugState]}
              />
            ),
          }))
          .sort(sortStates)
      );
    }
  }, [cpBugStates]);

  useEffect(() => {
    setSelectedItem(
      options.find((bugStatus) => bugStatus.id === custom_status.id)
    );
  }, [custom_status, options]);

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
          onSelect={async (item: DropdownItem) => {
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
            itemToString: (item: DropdownItem) => item && item.slug,
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
                  <SelectedItem>
                    {t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}
                  </SelectedItem>
                </Select>
              </Tooltip>
            ) : (
              <Select isCompact>
                <SelectedItem>
                  {selectedItem?.icon} {selectedItem?.text}
                </SelectedItem>
              </Select>
            )}
          </Field>
          <Menu zIndex={1}>
            {options &&
              options.map((item) => (
                <>
                  {item.slug === 'solved' && <Separator />}
                  <StyledItem
                    key={item.slug}
                    value={item}
                    className={`bug-dropdown-custom-status-${item.slug
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {item.icon} {item.text}
                  </StyledItem>
                </>
              ))}
            <Separator />
            <ManageItem
              disabled
              value={{}}
              key="not-solved"
              className="bug-dropdown-custom-status"
              onClick={onManageClick}
            >
              <GearIcon />{' '}
              {t('__BUGS_PAGE_BUG_DETAIL_CUSTOM_STATUS_DROPDOWN_MANAGE_LABEL')}
            </ManageItem>
          </Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default BugStateDropdown;
