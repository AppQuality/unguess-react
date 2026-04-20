import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { PageLoader } from 'src/common/components/PageLoader';
import { unguessApi, useGetUsersMeQuery } from 'src/features/api';
import { useAuth } from 'src/features/auth/context';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUsersMeQuery();
  const { logout: cognitoLogout } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        if (user?.authType === 'cognito') {
          await cognitoLogout();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Cognito logout error:', err);
      }

      try {
        await fetch(
          `${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php?action=unguess_wp_logout`,
          { method: 'GET', credentials: 'include' }
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('WP logout error:', err);
      }

      dispatch(unguessApi.util.resetApiState());
      navigate('/login');
    };

    performLogout();
  }, [navigate, dispatch, user, cognitoLogout]);

  return <PageLoader />;
};
