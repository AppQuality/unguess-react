import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';
import { syncWordpress } from 'src/features/auth/syncWordpress';

export const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const guard = { finished: false };

    const finish = async (succeeded: boolean) => {
      if (guard.finished) return;
      guard.finished = true;
      if (!succeeded) {
        navigate('/login', { replace: true });
        return;
      }
      await syncWordpress();
      navigate('/', { replace: true });
    };

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signInWithRedirect') finish(true);
      if (payload.event === 'signInWithRedirect_failure') finish(false);
    });

    getCurrentUser()
      .then(() => finish(true))
      .catch(() => {
        if (!window.location.search.includes('code=')) finish(false);
      });

    return unsubscribe;
  }, [navigate]);

  return <PageLoader />;
};
