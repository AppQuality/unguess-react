import {
  Dropdown,
  Select,
  Item,
  Menu,
  Skeleton,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import { DEFAULT_BUG_PRIORITY } from 'src/constants';
import {
  Bug,
  useGetCampaignsByCidPrioritiesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { getPriorityInfo } from '../utils/getPriorityInfo';
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

const Priority = ({ bug }: { bug: Bug }) => {
  const { t } = useTranslation();
  const { priority: bugPriority } = bug;
  const [selectedItem, setSelectedItem] = useState<DropdownItem>({
    id: DEFAULT_BUG_PRIORITY.id,
    slug: DEFAULT_BUG_PRIORITY.name,
    text: getPriorityInfo(DEFAULT_BUG_PRIORITY.name as Priority, t).text,
    icon: getPriorityInfo(DEFAULT_BUG_PRIORITY.name as Priority, t).icon,
  });
  const [options, setOptions] = useState<DropdownItem[]>([]);
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
      <Label style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL')}
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
