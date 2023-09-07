import { Grid, Row, Col } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as NoteIcon } from './assets/notebook.svg';
import { StyledCard } from './common';
import { CommentContextProvider } from './context/CommentContext';
import { CommentWrapper } from './Wrapper';

export const InsightComment = ({
  id,
  cid,
  comment,
}: {
  id: number;
  cid: number;
  comment?: string;
}) => (
  <StyledCard>
    <Grid id={`exp-insight-comment-${id}`}>
      <Row alignItems="center">
        <Col xs={12} sm="auto" alignSelf="start" style={{ margin: 0 }}>
          <StyledCard.Header style={{ marginTop: appTheme.space.xxs }}>
            <NoteIcon />
          </StyledCard.Header>
        </Col>
        <Col xs={12} sm={11} alignSelf="start" style={{ margin: 0 }}>
          <StyledCard.Header style={{ marginTop: appTheme.space.xxs }}>
            <CommentContextProvider initialComment={comment}>
              <CommentWrapper id={id} campaignId={cid} />
            </CommentContextProvider>
          </StyledCard.Header>
        </Col>
      </Row>
    </Grid>
  </StyledCard>
);
