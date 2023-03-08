import {
  Dropdown,
  Select,
  Item,
  Menu,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useState } from 'react';
import { DEFAULT_BUG_PRIORITY } from 'src/constants';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { getPriorityInfo } from '../utils/getPriorityInfo';
import { usePriority } from './hooks/usePriority';
import { Label } from './Label';

const StyledItem = styled(Item)`
  display: flex;
  align-items: center;

  svg {
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

  svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

type DropdownItem = {
  id: number;
  text: string;
  slug: string;
  icon: React.ReactNode;
};

export default ({ bug }: { bug: GetCampaignsByCidBugsAndBidApiResponse }) => {
  const { t } = useTranslation();

  const { data } = usePriority({
    cid: bug.campaign_id,
  });

  const priorities = data?.items || [];

  const items: DropdownItem[] = priorities.map((priority) => {
    const { icon, text } = getPriorityInfo(priority.name as Priority);

    return {
      id: priority.id,
      slug: priority.name,
      text: text ?? '',
      icon,
    };
  });

  const defaultPriorityInfo = getPriorityInfo(
    DEFAULT_BUG_PRIORITY.name as Priority
  );

  const [selectedItem, setSelectedItem] = useState<DropdownItem>({
    id: DEFAULT_BUG_PRIORITY.id,
    slug: DEFAULT_BUG_PRIORITY.name,
    text: defaultPriorityInfo.text ?? '',
    icon: defaultPriorityInfo.icon,
  });

  const onSelectItem = (item: DropdownItem) => {
    const selected = items.find((i) => i.slug === item.slug);
    if (selected) setSelectedItem(selected);
  };

  return (
    <Container>
      <Label style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL')}
      </Label>
      <Dropdown
        selectedItem={selectedItem}
        onSelect={onSelectItem}
        downshiftProps={{
          itemToString: (item: DropdownItem) => item && item.slug,
        }}
      >
        <Field>
          <Select isCompact>
            <SelectedItem>
              {selectedItem.icon} {selectedItem.text}
            </SelectedItem>
          </Select>
        </Field>
        <Menu hasArrow>
          {items.map((item) => (
            <StyledItem key={item.slug} value={item}>
              {item.icon} {item.text}
            </StyledItem>
          ))}
        </Menu>
      </Dropdown>
    </Container>
  );
};
