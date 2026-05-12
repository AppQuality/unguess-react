import { MD, PageHeader, SM } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { HeaderLoader } from '../pageHeaderLoading';
import { useHub } from './useHub';

const HubPageHeader = ({ hubId }: { hubId: number }) => {
  const result = useHub(hubId);

  if (result.isLoading) return <HeaderLoader />;
  if (result.isError || result.isUserLoading === undefined) return null;

  const { hub } = result;

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={hub.title}>
          <PageHeader.Title data-qa="hub_pageHeader_title">
            <MD isBold>{hub.title}</MD>
          </PageHeader.Title>
          <PageHeader.Meta>
            <SM style={{ color: appTheme.palette.grey[600] }}>ID: {hub.id}</SM>
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default HubPageHeader;
