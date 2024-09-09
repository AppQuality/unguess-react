import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCampaignsByCidPublicManualQuery } from 'src/features/api';

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
}: {
  data: { title?: string; description?: string };
}) => (
  <>
    <h1>Title: {data.title}</h1>
    <p>Description: {data.description}</p>
  </>
);

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
    return <Content data={data} />;
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
