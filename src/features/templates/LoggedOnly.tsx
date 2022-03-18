import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useAppSelector } from "src/app/hooks";
import { useNavigate } from 'react-router-dom';
import LoadingImg from 'src/assets/unguess_loader_single.gif';

const LoggedOnly = ({ children }: { children: React.ReactNode }) => {
  const loginRoute = useLocalizeRoute("login");
  const navigate = useNavigate();
  const userLoading = useAppSelector(state => state.user.status);

  if (userLoading === "idle" || userLoading === "loading"  ) {
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
            style={{ width: "280px" }}
            src={LoadingImg}
            alt="unguess loading"
          />
        </div>
      </div>
    );
  }
  
  if (userLoading === "failed") {
    navigate(loginRoute);
  }

  return <>{children}</>;
};

export default LoggedOnly;