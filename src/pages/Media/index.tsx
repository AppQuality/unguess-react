import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';
import {
  useGetSignedMediaByIdQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

const MediaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loginRoute = useLocalizeRoute('login');
  const oopsRoute = useLocalizeRoute('media/oops');

  const {
    data,
    error: signedError,
    isLoading: isSignedLoading,
    isFetching: isSignedFetching,
  } = useGetSignedMediaByIdQuery({ id: id ?? '' }, { skip: !id });

  const {
    error: userError,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetUsersMeQuery();

  useEffect(() => {
    if (isSignedLoading || isSignedFetching) return;
    if (data?.url) {
      window.location.assign(data.url);
      return;
    }
    if (!signedError) return;
    if (isUserLoading || isUserFetching) return;
    if (userError) {
      navigate(loginRoute, { state: { from: pathname }, replace: true });
    } else {
      navigate(oopsRoute, { replace: true });
    }
  }, [
    data,
    signedError,
    isSignedLoading,
    isSignedFetching,
    userError,
    isUserLoading,
    isUserFetching,
    navigate,
    loginRoute,
    oopsRoute,
    pathname,
  ]);

  return <PageLoader />;
};

export default MediaPage;
