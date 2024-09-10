import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCampaignsByCidPublicManualQuery,
  usePostCampaignsByCidUserMutation,
} from 'src/features/api';

const PasswordInput = ({
  setPassword,
}: {
  setPassword: (password: string) => void;
}) => {
  const [value, setValue] = useState('');

  return (
    <>
      <h6>password</h6>
      <input
        type="password"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={() => {
          setPassword(value);
        }}
      >
        Submit
      </button>
    </>
  );
};

const Content = ({
  data,
  campaignId,
}: {
  data: { title?: string; description?: string };
  campaignId: string;
}) => {
  const [createUser] = usePostCampaignsByCidUserMutation();
  const [token, setToken] = useState('');

  useEffect(() => {
    createUser({ cid: campaignId, body: { password: 'Pippo' } })
      .unwrap()
      .then((res) => {
        setToken(res?.token || '');
      });
  }, []);

  return (
    <>
      <h1>Title: {data.title}</h1>
      <p>Description: {data.description}</p>
      <p>Token: {token}</p>
    </>
  );
};

const PublicManual = () => {
  const [password, setPassword] = useState(
    localStorage.getItem('manualPassword') || ''
  );

  const { campaignId } = useParams();

  const isPasswordSet = localStorage.getItem('password');
  const { data, error } = useGetCampaignsByCidPublicManualQuery({
    pass: isPasswordSet || password,
    cid: campaignId?.toString() || '0',
  });

  if (data && !error) {
    if (!isPasswordSet) {
      // password is correct, save it to local storage
      localStorage.setItem('password', password);
    }
    return <Content data={data} campaignId={campaignId || ''} />;
  }

  const isLogged = localStorage.getItem('password');
  return (
    <>
      {(error && password !== '' && <div>{JSON.stringify(error)}</div>) ||
        !!isLogged}
      <PasswordInput setPassword={setPassword} />
    </>
  );
};

// PostPublicManualApiResponse
export default PublicManual;
