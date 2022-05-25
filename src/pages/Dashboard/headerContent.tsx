import {
  Grid,
  Row,
  Col,
  theme as globalTheme,
  Button,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import React from 'react';
import { FEATURE_FLAG_SKY_JOTFORM } from 'src/constants';
import { PageHeaderContainer } from 'src/common/components/pageHeaderContainer';
import { Feature } from 'src/features/api';
import { Counters } from './Counters';
import { Separator } from './Separator';

export const DashboardHeaderContent = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { status, userData } = useAppSelector((state) => state.user);

  const JOTFORM_URL = `https://form.jotform.com/220462541726351`;

  const hasButton =
    userData.features &&
    userData.features.find(
      (feature: Feature) => feature.slug === FEATURE_FLAG_SKY_JOTFORM
    );

  const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
  `;

  const StyledCol = styled(Col)`
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: ${({ theme }) => theme.space.lg};
    }
  `;

  return status === 'idle' || status === 'loading' ? (
    null
  ) : (
    <>
      <PageHeaderContainer>
        <Grid>
          <Row>
            <StyledCol xs={12} md={6}>
              {children}
            </StyledCol>
            {hasButton && (
              <Col xs={12} md={6}>
                <StyledButton
                  isPrimary
                  onClick={() => {
                    // eslint-disable-next-line security/detect-non-literal-fs-filename
                    window.open(JOTFORM_URL, '_blank')?.focus();  // disable because it's a false positive (https://github.com/nodesecurity/eslint-plugin-security/issues/26)
                  }}
                >
                  {t('__DASHBOARD_SKY_JOTFORM_LAUNCH_CP_BUTTON')}
                </StyledButton>
              </Col>
            )}
          </Row>
          <Row
            style={{
              marginTop: `${globalTheme.space.base * 6  }px`,
              paddingBottom: `${globalTheme.space.base * 6  }px`,
            }}
          >
            <Col xs={12}>
              <Counters />
            </Col>
          </Row>
        </Grid>
      </PageHeaderContainer>
      <Separator style={{ marginTop: 0 }} />
    </>
  );
};
