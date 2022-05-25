import TagManager from 'react-gtm-module';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'src/app/hooks';

const tagManagerArgs = {
  dataLayer: {
    role: 'unknown',
    wp_user_id: 0,
    tester_id: 0,
    name: 'unknown',
    email: 'unknown',
    company: 'unknown',
  },
};

export const GoogleTagManager = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { userData } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const helmet = () => {
    return (
      <Helmet>
        <title>{title} - UNGUESS</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={title} />
      </Helmet>
    );
  };

  if (userData?.role && userData?.tryber_wp_user_id) {
    tagManagerArgs.dataLayer = {
      role: userData.role,
      wp_user_id: userData.tryber_wp_user_id,
      tester_id: userData.id,
      name: userData.name,
      email: userData.email,
      company: activeWorkspace?.company || 'unknown',
    };
  }

  TagManager.dataLayer(tagManagerArgs);
  return (
    <>
      {helmet()}
      {children}
    </>
  );
};
