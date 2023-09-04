import { Ellipsis, MD, Progress, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { getPercentage, getSentiment } from '../utils';

const ListItemTitle = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  padding-top: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xxs};
  align-items: bottom;
`;

const ListItemWrapper = styled.div`
  margin-top: ${(p) => p.theme.space.xxs};
  display: block;
`;

const StyledSM = styled(SM)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: ${(p) => p.theme.space.xxs};
  }
`;

export interface Sentiment {
  id: number;
  title: string;
  sentiment: number;
  note: string;
}

export const Item = ({ item }: { item: Sentiment }) => {
  const { t } = useTranslation();

  return (
    <ListItemWrapper key={`cluster_${item.id}`}>
      <ListItemTitle>
        <div>
          <MD isBold style={{ color: appTheme.palette.blue[600] }}>
            {item.title}
          </MD>
          <Ellipsis title={item.note} style={{ width: '97%' }}>
            {item.note}
          </Ellipsis>
        </div>
        <StyledSM>{getSentiment(item.sentiment, t).text}</StyledSM>
      </ListItemTitle>
      <Progress
        value={getPercentage(item.sentiment)}
        size="small"
        color={getSentiment(item.sentiment, t).color}
        style={{ margin: 0, marginTop: appTheme.space.xxs }}
      />
    </ListItemWrapper>
  );
};
