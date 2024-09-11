import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCampaignsByCidPublicManualQuery,
  usePostCampaignsByCidUserMutation,
} from 'src/features/api';
import { PasswordInput } from './PasswordInput';
import {
  PublicManualContextProvider,
  usePublicManualContext,
} from './PublicManualContext';

const Content = () => {
  const { campaignId } = useParams();
  const [createUser] = usePostCampaignsByCidUserMutation();
  const [token, setToken] = useState('');

  useEffect(() => {
    createUser({ cid: campaignId || '0', body: { password: 'Pippo' } })
      .unwrap()
      .then((res) => {
        setToken(res?.token || '');
      });
  }, []);

  return (
    <>
      <br />
      <p>Token: {token}</p>
      <br />
      <div>Form XpsCpData</div>
    </>
  );
};

const useIsPasswordCorrect = (password: string) => {
  const { campaignId } = useParams();

  const { data, error } = useGetCampaignsByCidPublicManualQuery({
    pass: password,
    cid: campaignId?.toString() || '0',
  });

  return data && !error;
};

const useHasXpsCpData = (password: string) => {
  const { campaignId } = useParams();

  const { data, error } = useGetCampaignsByCidPublicManualQuery({
    pass: password,
    cid: campaignId?.toString() || '0',
  });

  if (!data || error) {
    return false;
  }

  return false;
  //  return !! data?.data
};

const PublicManualContent = () => {
  const { password, setPassword } = usePublicManualContext();
  const passwordIsCorrect = useIsPasswordCorrect(password);
  const hasXpsCpData = useHasXpsCpData(password);
  const isNotLogged = true;

  if (passwordIsCorrect) {
    if (hasXpsCpData && isNotLogged) {
      return <div>Form XpsCpData</div>;
    }
    return <Content />;
  }

  return (
    <>
      {password !== '' && <div>Errore ci fu</div>}
      <PasswordInput setPassword={setPassword} />
    </>
  );
};

const PublicManual = () => (
  <PublicManualContextProvider>
    <PublicManualContent />
  </PublicManualContextProvider>
);

export default PublicManual;
