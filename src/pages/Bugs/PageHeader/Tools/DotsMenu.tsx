import {
  Dropdown,
  IconButton,
  Item,
  Menu,
  Trigger,
} from '@appquality/unguess-design-system';
import { ReactComponent as DotsmenuIcon } from 'src/assets/icons/dots-menu.svg';
import { ReactComponent as ArrowDowloadIcon } from 'src/assets/icons/dowload-arrow.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { theme } from 'src/app/theme';
import { getLocalizeIntegrationCenterRoute } from 'src/hooks/useLocalizeIntegrationCenterUrl';
import { useTranslation } from 'react-i18next';
import WPAPI from 'src/common/wpapi';

export const DotsMenu = ({
  campaignId,
  customerTitle,
}: {
  campaignId: number;
  customerTitle: string;
}) => {
  const { t } = useTranslation();
  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(campaignId);

  return (
    <Dropdown
      onSelect={(item) => {
        if (item === 'integration-center')
          window.location.href = integrationCenterUrl;
        else if (item === 'download-report')
          WPAPI.getReport({ campaignId, title: customerTitle });
      }}
      onStateChange={(options) => Object.hasOwn(options, 'isOpen')}
    >
      <Trigger>
        <IconButton
          style={{
            color: theme.palette.grey['600'],
            marginLeft: theme.space.sm,
          }}
          onClick={() => {}}
        >
          <DotsmenuIcon style={{ height: '40px', width: '40px' }} />
        </IconButton>
      </Trigger>
      <Menu placement="bottom-end">
        <Item value="download-report">
          <ArrowDowloadIcon
            style={{
              height: '20px',
              width: '16px',
              marginRight: `${theme.space.base * 3}px`,
            }}
          />
          {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_REPORT')}
        </Item>
        <Item value="integration-center">
          <GearIcon
            style={{
              height: '20px',
              width: '16px',
              marginRight: `${theme.space.base * 3}px`,
            }}
          />
          {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_INT_CENTER')}
        </Item>
      </Menu>
    </Dropdown>
  );
};
