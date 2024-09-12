import { useEffect } from 'react';
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
import { FormXpsData } from './FormXpsData';

const Content = () => {
  const { password, getCpId } = usePublicManualContext();
  const [createUser] = usePostCampaignsByCidUserMutation();
  const { token, setToken } = usePublicManualContext();

  useEffect(() => {
    createUser({ cid: getCpId(), body: { password } })
      .unwrap()
      .then((res) => {
        setToken(res?.token || '');
      });
  }, []);

  return (
    <>
      <br />
      <p>Token: {token}</p>
    </>
  );
};

const useIsPasswordCorrect = (password: string) => {
  const { getCpId } = usePublicManualContext();

  const { data, error } = useGetCampaignsByCidPublicManualQuery({
    pass: password,
    cid: getCpId(),
  });

  return data && !error;
};

const useHasXpsCpData = (password: string) => {
  const { getCpId } = usePublicManualContext();

  const { data, error } = useGetCampaignsByCidPublicManualQuery({
    pass: password,
    cid: getCpId(),
  });

  if (!data || error) {
    return false;
  }

  return !!data?.data;
};

const PublicManualContent = () => {
  const { password, setPassword, token, userData, setToken, getCpId } =
    usePublicManualContext();
  const passwordIsCorrect = useIsPasswordCorrect(password);
  const hasXpsCpData = useHasXpsCpData(password);
  const isLogged = token !== '';
  const {
    data: cpData,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidPublicManualQuery({
    pass: password,
    cid: getCpId(),
  });
  const [createUser] = usePostCampaignsByCidUserMutation();

  useEffect(() => {
    if (userData && userData.length) {
      createUser({
        cid: getCpId(),
        body: { password, data: userData },
      })
        .unwrap()
        .then((res) => {
          setToken(res?.token || '');
        });
    }
  }, [userData]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (passwordIsCorrect) {
    if (hasXpsCpData && !isLogged && cpData?.data) {
      return <FormXpsData data={cpData?.data} />;
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

const PublicManual = () => {
  const { campaignId } = useParams();
  if (!campaignId) return <>dove sei finito? hai perso il cpId?</>;
  return (
    <PublicManualContextProvider cpId={campaignId}>
      <PublicManualContent />
    </PublicManualContextProvider>
  );
};

export default PublicManual;
