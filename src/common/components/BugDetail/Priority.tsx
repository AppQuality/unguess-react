import {
  Dropdown,
  Select,
  Item,
  Menu,
  Skeleton,
  MD,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import { DEFAULT_BUG_PRIORITY } from 'src/constants';
import {
  useGetCampaignsByCidBugsAndBidQuery,
  useGetCampaignsByCidPrioritiesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { getPriorityInfo } from '../utils/getPriorityInfo';

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

const Priority = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<DropdownItem>({
    id: DEFAULT_BUG_PRIORITY.id,
    slug: DEFAULT_BUG_PRIORITY.name,
    text: getPriorityInfo(DEFAULT_BUG_PRIORITY.name as Priority, t).text,
    icon: getPriorityInfo(DEFAULT_BUG_PRIORITY.name as Priority, t).icon,
  });
  const [options, setOptions] = useState<DropdownItem[]>([]);
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const { campaignId } = useParams();
  const currentBugId = getSelectedBugId();

  const {
    data: cpPriorities,
    isLoading: isLoadingCpPriorities,
    isFetching: isFetchingCpPriorities,
    isError: isErrorCpPriorities,
  } = useGetCampaignsByCidPrioritiesQuery({
    cid: campaignId || '',
  });

  const {
    data: bug,
    isLoading: isLoadingBug,
    isFetching: isFetchingBug,
    isError: isErrorBug,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId || '',
    bid: currentBugId?.toString() || '',
  });

  useEffect(() => {
    if (cpPriorities) {
      setOptions(
        cpPriorities.map((priority) => ({
          id: priority.id,
          slug: priority.name,
          text: getPriorityInfo(priority.name as Priority, t).text,
          icon: getPriorityInfo(priority.name as Priority, t).icon,
        }))
      );
    }
  }, [cpPriorities]);

  useEffect(() => {
    if (bug?.priority) {
      setSelectedItem({
        id: bug.priority.id,
        slug: bug.priority.name,
        text: getPriorityInfo(bug.priority.name as Priority, t).text,
        icon: getPriorityInfo(bug.priority.name as Priority, t).icon,
      });
    }
  }, [bug?.priority]);

  if (!bug || !cpPriorities || isErrorBug || isErrorCpPriorities) return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL')}
      </MD>
      {isLoadingBug ||
      isLoadingCpPriorities ||
      isFetchingBug ||
      isFetchingCpPriorities ? (
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
                priority_id: item.id,
              },
            });

            setSelectedItem(item);
          }}
          downshiftProps={{
            itemToString: (item: DropdownItem) => item && item.slug,
          }}
        >
          <Field className="bug-dropdown-custom-priority">
            <Select isCompact>
              <SelectedItem>
                {selectedItem.icon} {selectedItem.text}
              </SelectedItem>
            </Select>
          </Field>
          <Menu>
            {options &&
              options.map((item) => (
                <StyledItem
                  key={item.slug}
                  value={item}
                  className={`bug-dropdown-custom-priority-item-${item.slug.toLowerCase()}`}
                >
                  {item.icon} {item.text}
                </StyledItem>
              ))}
          </Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default Priority;
