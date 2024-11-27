import { useAppDispatch } from 'src/app/hooks';
import { useEffect, useState } from 'react';
import {
  Anchor,
  DotsMenu,
  PageHeader,
  Skeleton,
} from '@appquality/unguess-design-system';
import { ShareModal } from 'src/common/components/BugDetail/ShareModal';
import { Link } from 'react-router-dom';
import {
  GetCampaignsByCidApiResponse,
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
  useGetProjectsByPidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import { t } from 'i18next';
import { useCopyLink } from 'src/common/components/utils/useCopyLink';
import {
  setCampaignId,
  setPermissionSettingsTitle,
} from '../../features/navigation/navigationSlice';
import { BugShortcutHelper } from './BugShortcutHelper';

interface Props {
  campaignId: string;
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
}

const ActionContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  justify-content: space-between;
`;

const BreadCrumbs = ({
  campaign,
  children,
}: {
  campaign: GetCampaignsByCidApiResponse;
  children?: React.ReactNode;
}) => {
  const projectRoute = useLocalizeRoute(`projects/${campaign.project.id}`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaign.id}`);
  const bugsRoute = useLocalizeRoute(`campaigns/${campaign.id}/bugs`);

  const {
    currentData: project,
    isLoading,
    isFetching,
  } = useGetProjectsByPidQuery({
    pid: campaign.project.id.toString(),
  });

  if (isLoading || isFetching) {
    return <Skeleton width="200px" height="12px" />;
  }

  return (
    <ActionContainer>
      <PageHeader.Breadcrumbs>
        {project ? (
          <Link to={projectRoute}>
            <Anchor id="breadcrumb-parent">{project.name}</Anchor>
          </Link>
        ) : (
          campaign.project.name
        )}
        <Link to={campaignRoute}>
          <Anchor>{campaign.customer_title}</Anchor>
        </Link>
        <Link to={bugsRoute}>
          <Anchor>{t('__PAGE_TITLE_BUGS_COLLECTION')}</Anchor>
        </Link>
      </PageHeader.Breadcrumbs>
      {children}
    </ActionContainer>
  );
};

const StyledContainer = styled(LayoutWrapper)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export const Header = ({ campaignId, bug }: Props) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isShortcutModalOpen, setShortcutModalOpen] = useState(false);
  const copyLinkToClipboard = useCopyLink();

  const dispatch = useAppDispatch();
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });

  const handleClickMenu = (value: string | undefined) => {
    if (value === 'share') {
      setShareModalOpen(true);
    }
    if (value === 'copy') {
      copyLinkToClipboard();
    }
    if (value === 'shortcut') {
      setShortcutModalOpen(true);
    }

    return null;
  };

  useEffect(() => {
    if (campaign) {
      dispatch(setPermissionSettingsTitle(campaign.customer_title));
      dispatch(setCampaignId(campaign.id));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
    };
  }, [campaign]);

  if (isCampaignLoading || isCampaignFetching || isCampaignError || !campaign) {
    return (
      <LayoutWrapper>
        <PageHeader>
          <Skeleton height="50px" />
        </PageHeader>
      </LayoutWrapper>
    );
  }

  return (
    <StyledContainer isNotBoxed>
      <PageHeader style={{ border: 'none' }}>
        <BreadCrumbs campaign={campaign}>
          <DotsMenu onSelect={(value) => handleClickMenu(value)}>
            <DotsMenu.Item value="share">
              {t('__BUG_PAGE_HEADER_SHARE_LINK_CTA', 'Share public link')}
            </DotsMenu.Item>
            <DotsMenu.Item value="copy" onClick={() => {}}>
              {t('__BUG_PAGE_HEADER_COPY_LINK_CTA', 'Copy link')}
            </DotsMenu.Item>
            <DotsMenu.Item value="shortcut">
              {t('__BUG_PAGE_HEADER_SHORTCUT_LINK_CTA', 'Keyboard shortcuts')}
            </DotsMenu.Item>
          </DotsMenu>
        </BreadCrumbs>
        {isShareModalOpen && (
          <ShareModal bug={bug} onClose={() => setShareModalOpen(false)} />
        )}
        {isShortcutModalOpen && (
          <BugShortcutHelper onClose={() => setShortcutModalOpen(false)} />
        )}
      </PageHeader>
    </StyledContainer>
  );
};
