import { LG } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { ReactComponent as Empty } from './assets/empty.svg';

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledLG = styled(LG)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
`;
const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <EmptyContainer>
      <Empty style={{ width: 'auto', height: '260px' }} />
      <StyledLG isBold>
        {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_UNREAD_NO_BUGS')}
      </StyledLG>
    </EmptyContainer>
  );
};

export { EmptyState };
