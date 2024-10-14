import { SelectNew } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import { CampaignStatus } from 'src/features/campaigns';
import { statusFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import styled from 'styled-components';
import { DropdownItems, getItemText } from './utils';

const Circle = styled(CircleFill)`
  width: auto;
  height: 100%;
  max-height: 10px;
  margin: 0 2px;
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

  return (
    <SelectNew
      isPrimary={items[`${status}`].value !== 'all'}
      renderValue={() =>
        getItemText(
          items[`${status}`],
          t('__DASHABOARD_CAMPAIGN_STATUS_FILTER_LABEL Max:10')
        )
      }
      inputValue={items[`${status}`].value}
      selectionValue={items[`${status}`].value}
      onSelect={async (item) => {
        dispatch(statusFilterChanged(item));
      }}
    >
      {Object.keys(items).map((key) => (
        <SelectNew.Option
          key={items[`${key}`].value}
          value={items[`${key}`].value}
          isDisabled={availableStatuses.indexOf(items[`${key}`].value) === -1}
          label={items[`${key}`].label}
          icon={items[`${key}`].icon}
        />
      ))}
    </SelectNew>
  );
};
