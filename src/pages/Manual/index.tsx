import {
  PageLoader,
  Grid,
  Row,
  Col,
  Paragraph,
  LG,
  ContainerCard,
  Button,
} from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { extractStrapiData } from 'src/common/getStrapiData';
import { ManualResponse } from 'src/features/backoffice';
import { useGeti18nManualsQuery } from 'src/features/backoffice/strapi';
import i18n from 'src/i18n';
import { ReactComponent as EmptyImg } from 'src/assets/modal-use-case-empty.svg';
import { appTheme } from 'src/app/theme';
import { ReactComponent as BugIcon } from 'src/assets/icons/bugs-icon.svg';
import styled from 'styled-components';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { BrandLogo } from 'src/common/components/navigation/header/brandLogo';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { useTranslation } from 'react-i18next';
import { RightModalHelp } from './components/RightModalHelp';
import { ManualDetails } from './components/ManualDetails';
import { ManualHeader } from './components/ManualHeader';

const ContentCol = styled(Col)`
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const BodyContainer = styled.div`
  padding-right: ${({ theme }) => theme.space.lg};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.sm};
  }
`;

const StyledContainerCard = styled(ContainerCard)`
  margin-top: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const EmptyStateTitle = styled(LG)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const EmptyStateText = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const HelpCol = styled(Col)`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
  margin-bottom: 0;
  height: 100%;
  position: sticky;
  top: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const Manual = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { data, isLoading, isError } = useGeti18nManualsQuery({
    locale: i18n.language,
    filters: {
      campaignId: {
        $eq: campaignId,
      },
    },
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) return <PageLoader />;

  if (isError) {
    return <div>Error...</div>;
  }

  let manual:
    | (NonNullable<ManualResponse['data']>['attributes'] & { id: number })
    | undefined;
  if (data) {
    // eslint-disable-next-line prefer-destructuring
    manual = extractStrapiData(data)[0];
  }
  const handleClick = () => {
    if (!manual) return;
    navigate(`/campaigns/${manual.campaignId}/bugform`);
  };

  return (
    <div style={{ background: appTheme.palette.grey[100], maxWidth: '100%' }}>
      <ManualHeader>
        <LayoutWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BrandLogo size="full" />
            {manual && (
              <Button onClick={handleClick} isPrimary isAccent>
                <Button.StartIcon>
                  <BugIcon fill={appTheme.palette.white} />
                </Button.StartIcon>
                {t('__PUBLIC_MANUAL_CTA_GOTO_BUG_FORM')}
              </Button>
            )}
          </div>
        </LayoutWrapper>
      </ManualHeader>
      <LayoutWrapper>
        <Grid style={{ height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <ContentCol xs={12} lg={8}>
              <BodyContainer>
                <StyledContainerCard>
                  {manual ? (
                    <ManualDetails manual={manual} />
                  ) : (
                    <CenteredContainer>
                      <EmptyImg style={{ marginBottom: appTheme.space.lg }} />
                      <EmptyStateTitle>
                        {t('__PUBLIC_MANUAL_NOT_FOUND_TITLE')}
                      </EmptyStateTitle>
                      <EmptyStateText>
                        {t('__PUBLIC_MANUAL_NOT_FOUND_TEXT')}
                      </EmptyStateText>
                    </CenteredContainer>
                  )}
                </StyledContainerCard>
              </BodyContainer>
            </ContentCol>
            <HelpCol xs={12} lg={4}>
              <RightModalHelp />
            </HelpCol>
          </Row>
        </Grid>
      </LayoutWrapper>
    </div>
  );
};

export default Manual;