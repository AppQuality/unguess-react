import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';

export const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return <PageLoader />;
};
