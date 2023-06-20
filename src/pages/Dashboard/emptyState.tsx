import {
  Button,
  Col,
  LG,
  MD,
  Paragraph,
  Row,
} from '@appquality/unguess-design-system';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { resetFilters } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { ReactComponent as EmptyImage } from 'src/assets/emptySearchResults.svg';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';

const Illustration = styled(EmptyImage)`
  max-width: 30vw;
  margin-bottom: ${appTheme.space.xxl};
`;

const CenteredXYContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const EmptyResults = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { status, type, testNameId, search } = useAppSelector(
    (state) => state.filters
  );

  const hasFilters =
    status !== 'all' ||
    type !== 'all' ||
    testNameId > 0 ||
    (search && search !== '');

  return (
    <Row>
      <Col>
        <CenteredXYContainer>
          <Illustration />
          <Paragraph style={{ textAlign: 'center' }}>
            <LG color={appTheme.palette.blue[600]}>
              {t('__DASHBOARD_EMPTY_SEARCH_RESULTS_TITLE')}
            </LG>
            <MD color={appTheme.palette.grey[500]}>
              {t('__DASHBOARD_EMPTY_SEARCH_RESULTS_DESCRIPTION')}
            </MD>
          </Paragraph>

          {hasFilters && (
            <Paragraph style={{ marginTop: `${appTheme.space.base * 6}px` }}>
              <Button onClick={() => dispatch(resetFilters())}>
                {t('__DASHBOARD_EMPTY_SEARCH_RESULTS_RESET_FILTERS')}
              </Button>
            </Paragraph>
          )}
        </CenteredXYContainer>
      </Col>
    </Row>
  );
};
