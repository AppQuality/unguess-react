import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';

export const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return <PageLoader />;
};
