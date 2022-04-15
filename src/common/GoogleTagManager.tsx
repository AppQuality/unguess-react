import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { useAppSelector } from "src/app/hooks";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
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
