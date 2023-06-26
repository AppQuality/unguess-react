import { Dropdown, Select, Item } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { statusFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { CampaignStatus } from 'src/features/campaigns';
import { DropdownItem, DropdownItems, getItemText } from './utils';
import { UgMenu } from './styledMenu';

const Circle = styled(CircleFill)`
  width: auto;
  height: 100%;
  max-height: 10px;
  margin: 0 2px;
`;

const StyledItem = styled(Item)`
  svg {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

export const StatusDropdown = ({
  availableStatuses,
}: {
  availableStatuses: string[];
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.filters);

  const items: DropdownItems = {
    all: {
      label: t('__DASHABOARD_CAMPAIGN_STATUS_FILTER_ALL'),
      value: 'all',
    },
    incoming: {
      icon: <Circle color={appTheme.palette.azure[600]} />,
      label: t('__DASHABOARD_CAMPAIGN_STATUS_FILTER_INCOMING'),
      value: CampaignStatus.Incoming,
    },
    running: {
      icon: <Circle color={appTheme.palette.yellow[600]} />,
      label: t('__DASHABOARD_CAMPAIGN_STATUS_FILTER_PROGRESS'),
      value: CampaignStatus.Running,
    },
    completed: {
      icon: <Circle color={appTheme.palette.green[600]} />,
      label: t('__DASHABOARD_CAMPAIGN_STATUS_FILTER_COMPLETED'),
      value: CampaignStatus.Completed,
    },
  };

  const onSelectItem = (item: DropdownItem) => {
    dispatch(statusFilterChanged(item.value));
  };

  return (
    <Dropdown
      selectedItem={items[`${status}`]}
      onSelect={onSelectItem}
      downshiftProps={{
        itemToString: (item: DropdownItem) => item && item.value,
      }}
    >
      <Field>
        <Select
          {...(items[`${status}`].value !== 'all' && { isPrimary: true })}
        >
          {getItemText(
            items[`${status}`],
            t('__DASHABOARD_CAMPAIGN_STATUS_FILTER_LABEL Max:10')
          )}
        </Select>
      </Field>
      <UgMenu hasArrow>
        {Object.keys(items).map((key) => (
          <StyledItem
            key={items[`${key}`].value}
            value={items[`${key}`]}
            {...(availableStatuses.indexOf(items[`${key}`].value) === -1 && {
              disabled: true,
            })}
          >
            {items[`${key}`].icon ?? ''}
            {` ${items[`${key}`].label}`}
          </StyledItem>
        ))}
      </UgMenu>
    </Dropdown>
  );
};
