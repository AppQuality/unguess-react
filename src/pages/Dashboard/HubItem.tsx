import { SM, SpecialCard, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { formatApiDateDDMMYYYY } from 'src/common/date/apiDate';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HubsBgIcon } from 'src/assets/icons/hubs-bg-icon.svg';
import { GetHubsByHidApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const HubCard = styled(SpecialCard)`
  cursor: pointer;
`;

const HubDate = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const FooterIcon = styled(HubsBgIcon)`
  width: 16px;
  height: 16px;
`;

export const HubItem = ({ hub }: { hub: GetHubsByHidApiResponse }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hubRoute = useLocalizeRoute(`hubs/${hub.id}`);
  const title = hub.title ?? '';

  return (
    <HubCard
      className="suggested-hub-card"
      title={title}
      onClick={() => {
        navigate(hubRoute);
      }}
    >
      <SpecialCard.Meta>
        <HubDate>{formatApiDateDDMMYYYY(hub.start_date)}</HubDate>
      </SpecialCard.Meta>
      <SpecialCard.Header>
        <SpecialCard.Header.Label>{hub.project.name}</SpecialCard.Header.Label>
        <SpecialCard.Header.Title>{title}</SpecialCard.Header.Title>
      </SpecialCard.Header>
      <SpecialCard.Footer>
        <Tag isPill size="large">
          <Tag.Avatar>
            <FooterIcon />
          </Tag.Avatar>
          {t('__HUB_TAG_LABEL')}
        </Tag>
      </SpecialCard.Footer>
    </HubCard>
  );
};
