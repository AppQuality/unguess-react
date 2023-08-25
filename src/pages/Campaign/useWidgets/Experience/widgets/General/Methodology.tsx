import {
  ContainerCard,
  MD,
  Row,
  Col,
  SpecialCard,
  SM,
  LG,
  getColor,
  Accordion,
  Stepper,
  Timeline,
  Paragraph,
  Span,
  Avatar,
  Grid,
  Anchor,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidUxQuery,
} from 'src/features/api';
import { Divider } from 'src/common/components/divider';
import { ReactComponent as TargetIcon } from './assets/target.svg';
import { CircleList } from './List';
import { MethodologyNote } from './Note';

// export const CardFooter = styled(SpecialCard.Footer)`
//   flex-wrap: wrap;
//   margin-bottom: -${({ theme }) => theme.space.xs};

//   > * {
//     margin-bottom: ${({ theme }) => theme.space.xs};
//   }
// `;

const WidgetCard = styled(SpecialCard)`
  cursor: default;
  &:hover {
    box-shadow: none;
  }
`;

const StyledRow = styled(Row)`
  padding: ${({ theme }) => theme.space.base * 2}px 0;
`;

const Title = styled(LG)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.blue[600]};
`;
const Text = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export const Methodology = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();

  const {
    data: cpData,
    isLoading: cpIsLoading,
    isFetching: cpIsFetching,
  } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
  });

  if (
    isLoading ||
    cpIsLoading ||
    cpIsFetching ||
    isFetching ||
    isError ||
    !data ||
    !cpData
  )
    return <div>loading...</div>;

  const getStudyText = (type: string) => {
    switch (type.toLowerCase()) {
      case 'qualitative':
        return t('__CAMPAIGN_PAGE_METHODOLOGY_USERS_QUALITATIVE');
      case 'quantitative':
        return t('__CAMPAIGN_PAGE_METHODOLOGY_USERS_QUANTITATIVE');
      case 'quali-quantitative':
        return t('__CAMPAIGN_PAGE_METHODOLOGY_USERS_QUALIQUANTITATIVE');
      default:
        return '';
    }
  };

  return (
    <WidgetCard title={t('__CAMPAIGN_PAGE_METHODOLOGY_CARD_TITLE')}>
      <WidgetCard.Meta justifyContent="space-between">
        <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
          {t('__CAMPAIGN_PAGE_METHODOLOGY_CARD_TITLE')}
        </MD>
      </WidgetCard.Meta>
      <Divider />
      <Grid>
        <StyledRow alignItems="center">
          <Col xs={12} sm="auto" alignSelf="start" style={{ margin: 0 }}>
            <TargetIcon />
          </Col>
          <Col xs={12} sm={9} alignSelf="start" style={{ margin: 0 }}>
            <MethodologyNote
              title={cpData.type.name}
              text={data.methodology.description}
            />
          </Col>
        </StyledRow>
        <Divider />
        <StyledRow alignItems="center">
          <Col xs={12} sm="auto" style={{ margin: 0 }}>
            <TargetIcon />
          </Col>
          <Col xs={12} sm={9} style={{ margin: 0 }}>
            <MethodologyNote
              title={`${
                (t('__CAMPAIGN_PAGE_METHODOLOGY_USERS_NUMBER'),
                {
                  count: data.users,
                })
              }`}
              text={getStudyText(data.methodology.type)}
            />
          </Col>
        </StyledRow>
      </Grid>

      <Divider />
      <Anchor>asdasd</Anchor>
    </WidgetCard>
  );
};
