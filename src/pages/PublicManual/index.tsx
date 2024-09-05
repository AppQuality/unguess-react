import { useState } from 'react';
import { usePostPublicManualMutation } from 'src/features/api';

const PublicManual = () => {
  const [password, setPassword] = useState('');

  const [getPublicManual] = usePostPublicManualMutation();

  return (
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
          getPublicManual({ body: { password } });
        }}
      >
        Submit
      </button>
    </>
  );
};

// PostPublicManualApiResponse
export default PublicManual;
