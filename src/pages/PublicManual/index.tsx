import { useState } from 'react';
import { useGetPublicManualQuery } from 'src/features/api';

const PublicManual = () => {
  const [password, setPassword] = useState('');
  const [finalPassword, setFinalPassword] = useState('');

  const { data, error } = useGetPublicManualQuery({
    pass: finalPassword,
  });

  return (
    <>
      {error && finalPassword !== '' && <div>{JSON.stringify(error)}</div>}
      {data ? (
        <>{JSON.stringify(data)}</>
      ) : (
        <>
          <h6>password</h6>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              setFinalPassword(password);
            }}
          >
            Submit
          </button>
        </>
      )}
      {JSON.stringify(data)}
    </>
  );
};

// PostPublicManualApiResponse
export default PublicManual;
