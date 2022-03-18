import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useAppSelector } from "src/app/hooks";
import LoadingImg from "src/assets/unguess_loader.gif";

const NotLoggedOnly = ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const navigate = useNavigate();
  const userLoading = useAppSelector((state) => state.user.status);

  let redirectUrl = useLocalizeRoute("");
  if (redirect) {
    redirectUrl = redirect.url;
  }

  useEffect(() => {
    if (userLoading === "logged") {
      navigate(redirectUrl);
    }
  }, [userLoading, navigate, redirectUrl]);

  if (userLoading === "loading" || userLoading === "idle") {
    return (
      <div id="appq-loading-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "100px" }}
            src={LoadingImg}
            alt="unguess loading"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NotLoggedOnly;
