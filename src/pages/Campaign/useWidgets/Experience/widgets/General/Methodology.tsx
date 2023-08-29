import {
  MD,
  Row,
  Col,
  SpecialCard,
  SM,
  getColor,
  Grid,
  Anchor,
  Skeleton,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidUxQuery,
} from 'src/features/api';
import { Divider } from 'src/common/components/divider';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Link } from 'react-router-dom';
import { ReactComponent as CampaignInfo } from './assets/campaignInfo.svg';
import { ReactComponent as UserGroup } from './assets/userGroup.svg';
import { MethodologyNote } from './Note';

const WidgetCard = styled(SpecialCard)`
  cursor: default;
  &:hover {
    box-shadow: none;
  }
`;

const Summary = styled.div`
  margin: ${({ theme }) => theme.space.base * 2}px 0;
`;

const StyledRow = styled(Row)`
  padding: ${({ theme }) => theme.space.base * 2}px 0;
`;

const Label = styled(SM)`
  margin: ${({ theme }) => theme.space.base * 2}px 0;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const Methodology = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
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
    ...(!isPreview && { showAsCustomer: true }),
  });

  const servicesRoute = useLocalizeRoute(`services/#experience-optimization`);

  if (
    isLoading ||
    cpIsLoading ||
    cpIsFetching ||
    isFetching ||
    isError ||
    !data ||
    !cpData
  )
    return <Skeleton width="200px" height="12px" />;

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
    <WidgetCard>
      <WidgetCard.Meta justifyContent="space-between">
        <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
          {t('__CAMPAIGN_PAGE_METHODOLOGY_CARD_TITLE')}
        </MD>
      </WidgetCard.Meta>
      <Divider />
      <Grid>
        <Summary>
          <Row>
            <Col xs={12} style={{ margin: 0 }}>
              <Label isBold>
                {t('__CAMPAIGN_PAGE_METHODOLOGY_CARD_TEST_TYPOLOGY_LABEL')}
              </Label>
            </Col>
          </Row>
          <StyledRow alignItems="center">
            <Col xs={12} sm="auto" alignSelf="start" style={{ margin: 0 }}>
              <CampaignInfo />
            </Col>
            <Col xs={12} sm={9} alignSelf="start" style={{ margin: 0 }}>
              <MethodologyNote
                title={cpData.type.name}
                text={data.methodology.description}
              />
            </Col>
          </StyledRow>
        </Summary>

        <Divider />
        <Summary>
          <Row>
            <Col xs={12} style={{ margin: 0 }}>
              <Label isBold>
                {t('__CAMPAIGN_PAGE_METHODOLOGY_CARD_INVOLVED_USERS_LABEL')}
              </Label>
            </Col>
          </Row>
          <StyledRow alignItems="center">
            <Col xs={12} sm="auto" style={{ margin: 0 }}>
              <UserGroup />
            </Col>
            <Col xs={12} sm={9} style={{ margin: 0 }}>
              <MethodologyNote
                title={`${t('__CAMPAIGN_PAGE_METHODOLOGY_USERS_NUMBER', {
                  count: data.users,
                })}`}
                text={getStudyText(data.methodology.type)}
              />
            </Col>
          </StyledRow>
        </Summary>
      </Grid>
      <WidgetCard.Footer>
        <Link to={servicesRoute.slice(0, -1)} target="_blank">
          <Anchor isExternal>
            {t('__CAMPAIGN_PAGE_METHODOLOGY_SERVICES_LINK')}
          </Anchor>
        </Link>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
