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

  const isPasswordSet = localStorage.getItem('password');
  const { data, error } = useGetPublicManualQuery({
    pass: isPasswordSet || password,
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
