import { useParams, useSearchParams } from 'react-router-dom';
import { Header } from 'src/common/components/navigation/header/header';
import { isDev } from 'src/common/isDevEnvironment';
import i18n from 'src/i18n';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  max-width: 100%;
  min-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  max-width: 100%;
  min-width: 100%;
  border: none;
  margin: 0;
`;

const BugForm = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [query] = useSearchParams();
  const token = query.get('token') || '';
  const tryberUrl = process.env.REACT_APP_TRYBER_URL;
  const lang = i18n.language !== 'en' ? `/${i18n.language}` : '';

  return (
    <Container id="container">
      <StyledHeader logo="full" loggedIn={false} />
      <StyledIframe
        id="bug-form"
        title="Bug Form"
        src={`${tryberUrl}${lang}/vdp/${campaignId}/${token}`}
      />
    </Container>
  );
};

export default BugForm;
