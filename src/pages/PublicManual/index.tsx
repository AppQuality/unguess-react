import { useState } from 'react';
import { useGetPublicManualQuery } from 'src/features/api';

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

const Content = ({ data }: { data: { text?: string } }) => (
  <div>{data.text}</div>
);

const PublicManual = () => {
  const [password, setPassword] = useState(
    localStorage.getItem('manualPassword') || ''
  );

  const { data, error } = useGetPublicManualQuery({
    pass: password,
  });

  if (data) {
    localStorage.setItem('manualPassword', password);
    return <Content data={data} />;
  }

  return (
    <>
      {error && password !== '' && <div>{JSON.stringify(error)}</div>}
      <PasswordInput
        setPassword={(pass) => {
          setPassword(pass);
        }}
      />
    </>
  );
};

// PostPublicManualApiResponse
export default PublicManual;
