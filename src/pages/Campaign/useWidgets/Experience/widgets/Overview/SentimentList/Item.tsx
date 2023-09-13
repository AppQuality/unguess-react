import {
  MD,
  Progress,
  Grid,
  Row,
  Col,
  SM,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { getPercentage, getSentiment } from '../utils';

const ListItemWrapper = styled.div`
  margin-bottom: ${(p) => p.theme.space.sm};
  display: block;
`;

const StyledSM = styled(SM)`
  display: flex;
  align-items: center;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.xl}) {
    align-items: flex-end;
    justify-content: flex-end;
  }

  flex-shrink: 0;

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: ${(p) => p.theme.space.xxs};
  }
`;

const StyledRow = styled(Row)`
  @media screen and (max-width: ${(p) => p.theme.breakpoints.xl}) {
    gap: ${(p) => p.theme.space.xxs};
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
      {/* <ListItemTitle> */}
      <Grid>
        <StyledRow alignItemsXl="end">
          <Col xs={12} xl={10} style={{ margin: 0 }}>
            {/* <div > */}
            <MD isBold style={{ color: appTheme.palette.blue[600] }}>
              {item.title}
            </MD>
            <SM style={{ color: appTheme.palette.grey[600] }}>{item.note}</SM>
            {/* </div> */}
          </Col>
          <Col xs={12} xl={2} style={{ margin: 0 }}>
            <StyledSM>{getSentiment(item.sentiment, t).text}</StyledSM>
          </Col>
        </StyledRow>
      </Grid>
      {/* </ListItemTitle> */}
      <Progress
        value={getPercentage(item.sentiment)}
        size="small"
        color={getSentiment(item.sentiment, t).color}
        style={{ margin: 0, marginTop: appTheme.space.xxs }}
      />
    </ListItemWrapper>
  );
};
