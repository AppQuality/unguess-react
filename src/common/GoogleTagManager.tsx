import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";

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
  user,
}: {
  title: string;
  children: React.ReactNode;
  user?: UserState["userData"];
}) => {
  
  const helmet = () => {
    return (
      <Helmet>
        <title>{title} - UNGUESS</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={title} />
      </Helmet>
    );
  };
  if (user?.role && user?.tryber_wp_user_id) {
    tagManagerArgs.dataLayer = {
      role: user.role,
      wp_user_id: user.tryber_wp_user_id,
      tester_id: user.id,
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
