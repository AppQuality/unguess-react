import {
  Button,
  Drawer,
  IconButton,
  PageHeader,
  SM,
} from '@appquality/unguess-design-system';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AiIcon } from 'src/assets/icons/ai-icon-gradient.svg';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
import { useGetUsersMeQuery } from 'src/features/api';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { Workflow } from './workflow-ai';
import { Counters } from './Counters';

const StyledIconButton = styled(IconButton)`
  svg {
    width: ${({ theme }) => theme.iconSizes.lg} !important;
    height: ${({ theme }) => theme.iconSizes.lg} !important;
  }
`;

export const DashboardHeaderContent = ({
  pageTitle,
  handleOpenModal,
}: {
  pageTitle?: string;
  handleOpenModal: () => void;
}) => {
  const { t } = useTranslation();
  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();
  const { isMobile } = useWindowSize();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const hasWorksPacePermission = useCanAccessToActiveWorkspace();
  const navigate = useNavigate();
  const templatesRoute = useLocalizeRoute('templates');

  const threadId = uuidv4();

  console.log('🚀 ~ DashboardHeaderContent ~ threadId:', threadId);
  return isUserFetching || isUserLoading ? null : (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={pageTitle || 'My Dashboard'}>
          <PageHeader.Title>
            <PageTitle>{pageTitle || 'My Dashboard'}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Meta style={{ justifyContent: 'space-between' }}>
            <Counters />
            {hasWorksPacePermission && (
              <div style={{ gap: appTheme.space.xs, display: 'flex' }}>
                <Button isBasic onClick={handleOpenModal}>
                  {t('__DASHBOARD_CREATE_NEW_PROJECT')}
                </Button>
                <Button
                  isAccent
                  isPrimary
                  onClick={() => {
                    navigate(templatesRoute);
                  }}
                >
                  {t('__DASHBOARD_CTA_NEW_ACTIVITY')}
                </Button>
                <StyledIconButton onClick={() => setIsChatOpen(!isChatOpen)}>
                  <AiIcon />
                </StyledIconButton>
              </div>
            )}
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
      {isChatOpen && (
        <Drawer
          onClose={() => setIsChatOpen(false)}
          isOpen={isChatOpen}
          title="Testarolo support agent"
          style={{ width: isMobile ? '100%' : '30vw' }}
        >
          <Drawer.Header>
            <>
              Let&apos;s talk
              <SM>{threadId}</SM>
            </>
          </Drawer.Header>
          <Drawer.Close />
          <Drawer.Body>
            <Workflow threadId={threadId} />
          </Drawer.Body>
        </Drawer>
      )}
    </LayoutWrapper>
  );
};
