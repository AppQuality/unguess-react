import {
  Dropdown,
  Select,
  Item,
  Menu,
  Skeleton,
  Tooltip,
  Separator,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import {
  Bug,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { BugStateIcon } from 'src/common/components/BugStateIcon';
import { getBugStateLabel } from 'src/common/components/utils/getBugStateLabel';
import { Label } from './Label';

const StyledItem = styled(Item)`
  display: flex;
  align-items: center;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
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
            text: getBugStateLabel(bugState.name as BugState, t),
            icon: (
              <BugStateIcon
                {...globalTheme.colors.byBugState[bugState.name as BugState]}
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

  if (isError) return null;

  return (
    <div>
      <Label style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_STATE_LABEL')}
      </Label>
      {isLoading || isFetching ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: globalTheme.borderRadii.md }}
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
          <Field>
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
          <Menu>
            {options &&
              options.map((item, i) => (
                <>
                  {i === 5 && <Separator />}
                  <StyledItem key={item.slug} value={item}>
                    {item.icon} {item.text}
                  </StyledItem>
                </>
              ))}
          </Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default BugStateDropdown;
