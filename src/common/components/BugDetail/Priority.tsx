import { MD, Select, Skeleton } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { DEFAULT_BUG_PRIORITY } from 'src/constants';
import {
  Bug,
  useGetCampaignsByCidPrioritiesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { getPriorityInfo } from '../utils/getPriorityInfo';

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const Priority = ({ bug }: { bug: Bug }) => {
  const { t } = useTranslation();
  const { priority: bugPriority } = bug;
  const [selectedItem, setSelectedItem] = useState({
    id: DEFAULT_BUG_PRIORITY.id,
    slug: DEFAULT_BUG_PRIORITY.name,
    text: getPriorityInfo(DEFAULT_BUG_PRIORITY.name as Priority, t).text,
    icon: getPriorityInfo(DEFAULT_BUG_PRIORITY.name as Priority, t).icon,
  });
  const [options, setOptions] = useState<(typeof selectedItem)[]>([]);
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const {
    data: cpPriorities,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidPrioritiesQuery({
    cid: bug.campaign_id.toString(),
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
    if (bugPriority) {
      setSelectedItem({
        id: bugPriority.id,
        slug: bugPriority.name,
        text: getPriorityInfo(bugPriority.name as Priority, t).text,
        icon: getPriorityInfo(bugPriority.name as Priority, t).icon,
      });
    }
  }, [bugPriority]);

  if (isError) return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL')}
      </MD>
      {isLoading || isFetching ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: appTheme.borderRadii.md }}
        />
      ) : (
        <Select
          renderValue={(value) => {
            const selectedStatus = options.find(
              (s) => s.id === Number(value.inputValue)
            );
            return (
              <SelectedItem>
                {selectedStatus?.icon} {selectedStatus?.text}
              </SelectedItem>
            );
          }}
          isCompact
          inputValue={selectedItem.id.toString()}
          selectionValue={selectedItem.id.toString()}
          onSelect={async (value) => {
            await patchBug({
              cid: bug.campaign_id.toString(),
              bid: bug.id.toString(),
              body: {
                priority_id: Number(value),
              },
            });
          }}
        >
          {options &&
            options.map((item) => (
              <Select.Option
                key={item.slug}
                value={item.id.toString()}
                label={item.text}
                icon={item.icon}
                className={`bug-dropdown-custom-priority-item-${item.slug.toLowerCase()}`}
              />
            ))}
        </Select>
      )}
    </div>
  );
};

export default Priority;
