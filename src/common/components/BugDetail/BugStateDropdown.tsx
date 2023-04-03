import {
  Dropdown,
  Select,
  Item,
  Menu,
  Skeleton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import { DEFAULT_BUG_STATUS } from 'src/constants';
import {
  Bug,
  useGetCampaignsByCidPrioritiesQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { getBugStateInfo } from '../utils/getBugStateInfo';
import { Label } from './Label';

const StyledItem = styled(Item)`
  display: flex;
  align-items: center;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.md};
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
  const { status } = bug;
  const [selectedItem, setSelectedItem] = useState<DropdownItem>({
    id: DEFAULT_BUG_STATUS.id,
    slug: DEFAULT_BUG_STATUS.name,
    text: getBugStateInfo(DEFAULT_BUG_STATUS.name as BugState, t).text,
    icon: getBugStateInfo(DEFAULT_BUG_STATUS.name as BugState, t).icon,
  });
  const [options, setOptions] = useState<DropdownItem[]>([]);
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const {
    data: cpBugStatuses,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidPrioritiesQuery({
    cid: bug.campaign_id.toString(),
  });

  useEffect(() => {
    if (cpBugStatuses) {
      setOptions(
        cpBugStatuses.map((bugStatus) => ({
          id: bugStatus.id,
          slug: bugStatus.name,
          text: getBugStateInfo(bugStatus.name as BugState, t).text,
          icon: getBugStateInfo(bugStatus.name as BugState, t).icon,
        }))
      );
    }
  }, [cpBugStatuses]);

  useEffect(() => {
    if (status) {
      setSelectedItem({
        id: status.id,
        slug: status.name,
        text: getBugStateInfo(status.name as BugState, t).text,
        icon: getBugStateInfo(status.name as BugState, t).icon,
      });
    }
  }, [status]);

  if (isError) return null;

  return (
    <Container>
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
                // status_id: item.id,
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
                  {selectedItem.icon} {selectedItem.text}
                </SelectedItem>
              </Select>
            )}
          </Field>
          <Menu>
            {options &&
              options.map((item) => (
                <StyledItem key={item.slug} value={item}>
                  {item.icon} {item.text}
                </StyledItem>
              ))}
          </Menu>
        </Dropdown>
      )}
    </Container>
  );
};

export default BugStateDropdown;
